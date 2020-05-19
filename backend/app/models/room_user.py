from flask_restful import fields
from flask_restful_swagger import swagger
from app import db
from app.models.room import Room
from app.models.user import User

@swagger.model
class RoomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey(Room.id), index=True, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), unique=False)
    room_relation = db.relationship(Room, foreign_keys=room_id)
    user_relation = db.relationship(User, foreign_keys=user_id)

    resource_fields = {
        "id": fields.Integer,
        "room_id": fields.String(attribute="ID of the room"),
        "user_id": fields.String(attribute="ID of the user"),
    }

    def __repr__(self):
        return f"Room({self.room_id}) with User({self.user_id})) "