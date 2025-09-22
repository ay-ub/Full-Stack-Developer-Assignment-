import cv2
import os
from typing import Optional, Dict, Any
from app.schemas.video import VideoInfo

def get_video_info(file_path: str) -> VideoInfo:
    """
    Extract video information using OpenCV
    """
    file_size = os.path.getsize(file_path)
    
    cap = cv2.VideoCapture(file_path)
    
    duration = None
    width = None
    height = None
    format_info = None
    codec = None
    
    if cap.isOpened():
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        if fps > 0:
            duration = frame_count / fps
            
        fourcc = cap.get(cv2.CAP_PROP_FOURCC)
        if fourcc:
            codec = "".join([chr((int(fourcc) >> 8 * i) & 0xFF) for i in range(4)])
            
        format_info = os.path.splitext(file_path)[1].lower().replace('.', '')
        
        cap.release()
    
    return VideoInfo(
        duration=duration,
        width=width,
        height=height,
        format=format_info,
        codec=codec,
        file_size=file_size
    )

def is_video_file(filename: str) -> bool:
    """
    Check if the uploaded file is a video file based on extension
    """
    video_extensions = {'.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.m4v'}
    ext = os.path.splitext(filename)[1].lower()
    return ext in video_extensions