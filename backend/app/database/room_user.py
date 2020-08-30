from flask_restful import fields
from flask_restful_swagger import swagger
from app import db
from app.database.room import Room
from app.database.user import User
from app.database.common.guid import GUID

@swagger.model
class RoomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(GUID(), db.ForeignKey(Room.id), index=True, unique=False)
    # Each user can only be in one room at a time
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), unique=True)
    room_relation = db.relationship(Room, foreign_keys=room_id)
    user_relation = db.relationship(User, foreign_keys=user_id)

    def __repr__(self):
        return f"<RoomUser>(id: {self.id}, room_id: {self.room_id}, user_id:{self.user_id})"

    def to_json(self):
        return {
            "id": self.id,
            "room_id": self.room_id,
            "user_id": self.room_id,
        }