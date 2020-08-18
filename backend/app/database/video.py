from flask import jsonify
from flask_restful import fields
from flask_restful_swagger import swagger
from app import db

@swagger.model
class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(64), index=True, unique=False)

    def __repr__(self):
        return f"<Video(id: {self.id}, url: {self.url})"

    def to_json(self):
        return {
            "id": self.id,
            "url": self.url
        }