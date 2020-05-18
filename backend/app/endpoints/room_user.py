from flask import jsonify, request
from flask_restful import Resource, reqparse, marshal_with
from flask_restful_swagger import swagger
from app import api, db
from app.models.room_user import RoomUser
from app.models.user import User

class RoomUserAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("user_id", type=str, required=False, default="", location="json")
        super(RoomUserAPI, self).__init__()

    @marshal_with(User.resource_fields)
    @swagger.operation(
        notes="Returned all users in a given room",
        responseClass=User.__name__,
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to get users for",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Got all of the users in the room"
            },
        ]
    )
    def get(self, room_id):
        room_users = RoomUser.query.join(User, User.id == RoomUser.user_id) \
                                    .add_columns(User.id, User.name) \
                                    .filter(RoomUser.room_id==room_id) \
                                    .all()
        return jsonify([
            {
                "id": user_id,
                "name": user_name,
            }
            for x, user_id, user_name in room_users
        ])

    @marshal_with(RoomUser.resource_fields)
    @swagger.operation(
        notes="Adds a user to a room",
        responseClass=RoomUser.__name__,
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to add the user to",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "path"
            }, {
                "name": "user_id",
                "description": "ID of the user to add to the room",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Added the user to the room"
            },
        ]
    )
    def post(self, room_id):
        args = self.reqparse.parse_args()
        room_user = RoomUser(room_id=room_id, user_id=args["user_id"])
        db.session.add(room_user)
        db.session.commit()
        return jsonify(success=True)

    @swagger.operation(
        notes="Removes a user from a room",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to remove the user from",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "path"
            }, {
                "name": "user_id",
                "description": "ID of the user to remove from the room",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Removed the user to the room"
            },
        ]
    )
    def delete(self, room_id):
        args = self.reqparse.parse_args()
        room_user = RoomUser.query.filter_by(room_id=room_id, user_id=args["user_id"])
        db.session.delete(room_user)
        db.session.commit()
        return jsonify(success=True)