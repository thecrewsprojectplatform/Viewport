from app import db
from app.models.room import Room
from app.models.user import User

class RoomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey(Room.id), index=True, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), unique=False)
    room_relation = db.relationship(Room, foreign_keys=room_id)
    user_relation = db.relationship(User, foreign_keys=user_id)

    def __repr__(self):
        return f"Room({self.room_id}) with User({self.user_id})) "