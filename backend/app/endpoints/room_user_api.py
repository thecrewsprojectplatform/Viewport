from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask_restful_swagger import swagger
from werkzeug.exceptions import BadRequest
from typing import List
from app import db
from app.database.room import Room
from app.database.room_user import RoomUser
from app.database.user import User
from app.endpoints.utils import create_400_error, create_404_error, create_500_error

class RoomUserListApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("user_id", type=str, required=True, location="json")
        super(RoomUserListApi, self).__init__()

    @swagger.operation(
        notes="Returns all users in a given room",
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
                "code": 200,
                "message": "Got all of the users in the room"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self, room_id):
        try:
            return jsonify(self.__get_all_users_in_room(room_id))
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __get_all_users_in_room(self, room_id):
        if Room.query.get(room_id) is None:
            raise LookupError("Room not found")
        room_users = RoomUser.query.filter_by(room_id=room_id).all()
        users = User.query.filter(User.id.in_([x.user_id for x in room_users])).all()
        return [
            user.to_json() for user in users
            
        ]

    @swagger.operation(
        notes="Adds a user to a room",
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
                "code": 200,
                "message": "Added the user to the room"
            }, {
                "code": 400,
                "message": "Bad request",
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def post(self, room_id):
        try:
            args = self.reqparse.parse_args()
            self.__add_user_to_room(args["user_id"], room_id)
            return jsonify(success=True)
        except BadRequest:
            return create_400_error()
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __add_user_to_room(self, user_id, room_id):
        if Room.query.get(room_id) is None:
            raise LookupError("Room not found")
        elif User.query.get(user_id) is None:
            raise LookupError("User not found")
        room_user = RoomUser(room_id=room_id, user_id=user_id)
        db.session.add(room_user)
        db.session.commit()
        return

class RoomUserApi(Resource):
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
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Removed the user to the room"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def delete(self, room_id, user_id):
        try:
            self.__remove_user_from_room(user_id, room_id)
            return jsonify(success=True)
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __remove_user_from_room(self, user_id, room_id):
        room_user = RoomUser.query.filter_by(room_id=room_id, user_id=user_id).first()
        if room_user is None:
            raise LookupError("RoomUser not found")
        db.session.delete(room_user)
        db.session.commit()
        return