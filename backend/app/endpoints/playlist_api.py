from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask_restful_swagger import swagger
from werkzeug.exceptions import BadRequest
from app import db
from app.database.room import Room
from app.endpoints.utils import create_400_error, create_404_error, create_500_error

class PlaylistApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("room_id", type=)
        self.reqparse.add_argument("video_url", type=str, required=False, default="PAUSED", location="json")
        super(VideoStateApi, self).__init__()

    @swagger.operation(
        notes="Returns the state of the video",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Returned the state of the video"
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
            return jsonify(self.__get_state(room_id))
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __get_state(self, room_id):
        room = Room.query.get(room_id)
        if room is None:
            raise LookupError("Room not found")

        return room.video_state

    @swagger.operation(
        notes="Updates the video state",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Updated the state of the video"
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
    def put(self, room_id):
        try:
            return self.__update_state(room_id, self.reqparse.parse_args())
        except BadRequest:
            return create_400_error()
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __update_state(self, room_id, args):
        room = Room.query.get(room_id)
        if room is None:
            raise LookupError("Room not found")
        for k, v in args.items():
            setattr(room, k, v)
        db.session.commit()
        return room.to_json()