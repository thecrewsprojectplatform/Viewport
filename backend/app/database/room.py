from flask_restful import fields
from flask_restful_swagger import swagger
from app import db

@swagger.model
class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    video_url = db.Column(db.String(64), index=False, unique=False, default="")
    video_time = db.Column(db.Float, index=False, unique=False, default=0)
    video_length = db.Column(db.Float, index=False, unique=False, default=0)
    video_volume = db.Column(db.Float, index=False, unique=False, default=0.5)
    # Can be PLAYING, PAUSED
    video_state = db.Column(db.String(16), index=False, unique=False)
    valid_video_states = ["PLAYING", "PAUSED"]

    def __repr__(self):
        return f"<Room>(\
            id: {self.id}, \
            name: {self.name},\
            video_url: {self.video_url},\
            video_state: {self.video_state},\
            video_time: {self.video_time},\
            video_length: {self.video_length},\
            video_volume: {self.video_volume})"

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "video_url": self.video_url,
            "video_state": self.video_state,
            "video_time": self.video_time,
            "video_length": self.video_length,\
            "video_volume": self.video_volume
        }