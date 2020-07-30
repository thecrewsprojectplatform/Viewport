from flask_restful import fields
from flask_restful_swagger import swagger
from app import db
from app.database.room import Room
from app.database.user import User

@swagger.model
class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey(Room.id), index=True, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), unique=False)
    video_url = db.Column(db.String(64), unique=False)
    room_relation = db.relationship(Room, foreign_keys=room_id)
    user_relation = db.relationship(User, foreign_keys=user_id)

    def __repr__(self):
        return f"<Playlist>(id: {self.id}, room_id: {self.room_id}, user_id:{self.user_id}, video_url:{self.video_url})"

    def to_json(self):
        return {
            "id": self.id,
            "room_id": self.room_id,
            "user_id": self.room_id,
            "video_url": self.video_url
        }