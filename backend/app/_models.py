from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)

    def __repr__(self):
        return f"User(name: {self.name}, id: {self.id})"

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    video_id = db.Column(db.String(64), index=False, unique=False)

    def __repr__(self):
        return f"Room(name: {self.name}, id: {self.id}, video_id: {self.video_id})"

class RoomUsers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey(Room.id), index=True, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), unique=False)
    room_relation = db.relationship(Room, foreign_keys=room_id)
    user_relation = db.relationship(User, foreign_keys=user_id)
    # user_relation = db.relationship("User", foreign_keys="roomusers.user_id", back_populates="roomusers")

    def __repr__(self):
        return f"Room({self.room_id}) with User({self.user_id})) "