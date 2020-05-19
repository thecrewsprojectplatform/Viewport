from flask_restful import fields
from flask_restful_swagger import swagger
from app import db

@swagger.model
class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    video_id = db.Column(db.String(64), index=False, unique=False)

    resource_fields = {
        "id": fields.Integer,
        "name": fields.String(attribute="Name of room"),
        "video_id": fields.String(attribute="ID of video for the room"),
    }

    def __repr__(self):
        return f"Room(name: {self.name}, id: {self.id}, video_id: {self.video_id})"