from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import shutil
import os
from typing import List
from app.database import get_db
from app.controllers.video_controller import create_video, get_all_videos, get_video_by_id
from app.schemas.video import VideoCreate, VideoResponse
from app.utils.video_utils import get_video_info, is_video_file

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-video", response_model=VideoResponse)
async def upload_video(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not is_video_file(file.filename):
        raise HTTPException(status_code=400, detail="Only video files are allowed")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        video_info = get_video_info(file_path)
        
        video_data = VideoCreate(
            name=os.path.splitext(file.filename)[0],  # filename without extension
            original_filename=file.filename,
            file_path=file_path,
            file_size=video_info.file_size,
            duration=video_info.duration,
            width=video_info.width,
            height=video_info.height,
            format=video_info.format,
            codec=video_info.codec
        )
        
        db_video = create_video(db, video_data)
        
        return db_video
        
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@router.get("/videos", response_model=List[VideoResponse])
async def get_videos(db: Session = Depends(get_db)):
    """
    Get all uploaded videos information
    """
    videos = get_all_videos(db)
    return videos

@router.get("/videos/stream/{video_id}")
async def stream_video(video_id: str, request: Request, db: Session = Depends(get_db)):
    """
    Stream video content with support for range requests (video seeking)
    """
    video = get_video_by_id(db, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    if not os.path.exists(video.file_path):
        raise HTTPException(status_code=404, detail="Video file not found on disk")
    
    file_size = os.path.getsize(video.file_path)
    
    range_header = request.headers.get('range')
    
    if range_header:
        range_match = range_header.replace('bytes=', '').split('-')
        start = int(range_match[0]) if range_match[0] else 0
        end = int(range_match[1]) if range_match[1] else file_size - 1
        
        end = min(end, file_size - 1)
        content_length = end - start + 1
        
        def iter_file():
            with open(video.file_path, 'rb') as file:
                file.seek(start)
                remaining = content_length
                while remaining > 0:
                    chunk_size = min(8192, remaining)  # 8KB chunks
                    chunk = file.read(chunk_size)
                    if not chunk:
                        break
                    remaining -= len(chunk)
                    yield chunk
        
        headers = {
            'Content-Range': f'bytes {start}-{end}/{file_size}',
            'Accept-Ranges': 'bytes',
            'Content-Length': str(content_length),
            'Content-Type': 'video/mp4',
        }
        
        return StreamingResponse(
            iter_file(),
            status_code=206, 
            headers=headers
        )
    
    else:
        
        def iter_file():
            with open(video.file_path, 'rb') as file:
                while chunk := file.read(8192): 
                    yield chunk
        
        headers = {
            'Content-Length': str(file_size),
            'Accept-Ranges': 'bytes',
            'Content-Type': 'video/mp4',
        }
        
        return StreamingResponse(
            iter_file(),
            headers=headers
        )
