from flask_restful import fields
from flask_restful_swagger import swagger
import uuid
from app import db
from app.database.common.guid import GUID

@swagger.model
class Room(db.Model):
    id = db.Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(64), index=True, unique=False)
    video_url = db.Column(db.String(64), index=False, unique=False, default="")
    video_time = db.Column(db.Float, index=False, unique=False, default=0)

    # Can be PLAYING, PAUSED
    video_state = db.Column(db.String(16), index=False, unique=False, default="PAUSED")
    valid_video_states = ["PLAYING", "PAUSED"]

    def __repr__(self):
        return f"<Room>(\
            id: {self.id}, \
            name: {self.name},\
            video_url: {self.video_url},\
            video_state: {self.video_state},\
            video_time: {self.video_time})"

    def to_json(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "video_url": self.video_url,
            "video_state": self.video_state,
            "video_time": self.video_time,
        }