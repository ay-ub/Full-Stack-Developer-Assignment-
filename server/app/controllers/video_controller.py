from sqlalchemy.orm import Session
from app.models.video import Video
from app.schemas.video import VideoCreate, VideoResponse
from typing import List
import uuid

def create_video(db: Session, video_data: VideoCreate) -> Video:
    """
    Create a new video record in the database
    """
    video_id = str(uuid.uuid4())
    db_video = Video(
        id=video_id,
        **video_data.model_dump()
    )
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def get_all_videos(db: Session) -> List[Video]:
    """
    Get all videos from the database
    """
    return db.query(Video).all()

def get_video_by_id(db: Session, video_id: str) -> Video:
    """
    Get a specific video by ID
    """
    return db.query(Video).filter(Video.id == video_id).first()

def delete_video(db: Session, video_id: str) -> bool:
    """
    Delete a video record from the database
    """
    video = db.query(Video).filter(Video.id == video_id).first()
    if video:
        db.delete(video)
        db.commit()
        return True
    return False