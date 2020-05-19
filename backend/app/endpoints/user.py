from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask_restful_swagger import swagger
from app import api, db
from app.models.user import User
from app.models.room_user import RoomUser

class UserListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        super(UserListAPI, self).__init__()

    @swagger.operation(
        notes="Returns all users",
        responseClass=User.__name__,
        parameters=[],
        responseMessages=[
            {
                "code": 201,
                "message": "Got all of the users"
            },
        ]
    )
    def get(self):
        return jsonify([
            {
                "id": x.id,
                "name": x.name,
            }
            for x in User.query.all()
        ])

    @swagger.operation(
        notes="Creates a new user",
        responseClass=User.__name__,
        parameters=[
            {
                "name": "name",
                "description": "Name of the user to add",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Created the new user successfully"
            },
        ]
    )
    def post(self):
        args = self.reqparse.parse_args()
        user = User(name=args["name"])
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "id": user.id,
            "name": user.name,
        })

class UserAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        super(UserAPI, self).__init__()

    @swagger.operation(
        notes="Returns the specific user",
        responseClass=User.__name__,
        parameters=[
            {
                "name": "user_id",
                "description": "ID of the user to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Returned the user"
            },
        ]
    )
    def get(self, user_id):
        user = User.query.get(user_id)
        return jsonify({
            "id": user.id,
            "name": user.name,
        })

    @swagger.operation(
        notes="Updates the specific user",
        responseClass=User.__name__,
        parameters=[
            {
                "name": "user_id",
                "description": "ID of the user to update",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
            {
                "name": "name",
                "description": "Name to update user with",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Updated the user"
            },
        ]
    )
    def put(self, user_id):
        user = User.query.get(user_id)
        args = self.reqparse.parse_args()
        for k, v in self.reqparse.parse_args().items():
            if v is not None:
                setattr(user, k, v)
        db.session.commit()
        return jsonify({
            "id": user.id,
            "name": user.name,
        })


    @swagger.operation(
        notes="Deletes the specific user",
        parameters=[
            {
                "name": "user_id",
                "description": "ID of the user to delete",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Deleted the user"
            },
        ]
    )
    def delete(self, user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify(success=True)
