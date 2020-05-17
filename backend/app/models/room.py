from app import db

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    video_id = db.Column(db.String(64), index=False, unique=False)

    def __repr__(self):
        return f"Room(name: {self.name}, id: {self.id}, video_id: {self.video_id})"