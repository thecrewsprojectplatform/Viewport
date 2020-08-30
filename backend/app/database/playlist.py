from flask_restful import fields
from flask_restful_swagger import swagger
from app import db
from app.database.room import Room
from app.database.video import Video
from app.database.common.guid import GUID

@swagger.model
class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(GUID(), db.ForeignKey(Room.id), index=True, unique=False)
    video_id = db.Column(db.Integer, db.ForeignKey(Video.id))
    room_relation = db.relationship(Room, foreign_keys=room_id)
    video_relation = db.relationship(Video, foreign_keys=video_id)

    def __repr__(self):
        return f"<Playlist>(\
            id: {self.id}, \
            room_id: {self.room_id}, \
            video_id:{self.video_id})"

    def to_json(self):
        return {
            "id": self.id,
            "room_id": self.room_id,
            "video_id": self.video_id
        }