from flask import jsonify
from flask_restful import fields
from flask_restful_swagger import swagger
from app import db

@swagger.model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)

    def __repr__(self):
        return f"<User>(id: {self.id}, name: {self.name})"

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
        }
