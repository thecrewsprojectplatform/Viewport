from flask_restful import fields
from flask_restful_swagger import swagger
from app import db

@swagger.model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)

    resource_fields = {
        "id": fields.Integer,
        "name": fields.String(attribute="Name of the user"),
    }

    def __repr__(self):
        return f"User(name: {self.name}, id: {self.id})"