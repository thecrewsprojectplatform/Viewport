from flask import jsonify
from flask_restful import fields
from flask_restful_swagger import swagger
from app import db
from app.database.user import User

@swagger.model
class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    url = db.Column(db.String(64), index=True, unique=False)
    user_relation = db.relationship(User, foreign_keys=user_id)

    def __repr__(self):
        return f"<Video(id: {self.id}, user_id: {self.user_id} url: {self.url})"

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "url": self.url
        }