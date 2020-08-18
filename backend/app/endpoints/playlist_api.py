from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask_restful_swagger import swagger
from werkzeug.exceptions import BadRequest
from app import db
from app.database.playlist import Playlist
from app.database.room import Room
from app.database.user import User
from app.database.video import Video
from app.endpoints.utils import create_400_error, create_404_error, create_500_error

class CreatePlaylistApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("user_id", type=int, required=True, location="json")
        self.reqparse.add_argument("video_id", type=int, required=True, location="json")
        super(CreatePlaylistApi, self).__init__()

    @swagger.operation(
        notes="Adds a video to the playlist",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            }, {
                "name": "user_id",
                "description": "ID of the video to add to the playlist",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            }, {
                "name": "video_id",
                "description": "id of the video to add",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            }
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Added the video to the playlist"
            }, {
                "code": 400,
                "message": "Bad request"                
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
            return(jsonify(self.__add_video_to_playlist(room_id, args["user_id"], args["video_id"])))
        except BadRequest:
            return create_400_error()
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()

    def __add_video_to_playlist(self, room_id, user_id, video_id):
        if Room.query.get(room_id) is None:
            raise LookupError("Room not found")
        elif User.query.get(user_id) is None:
            raise LookupError("User not found")
        elif Video.query.get(video_id) is None:
            raise LookupError("Video not found")
        playlist = Playlist(room_id=room_id, user_id=user_id, video_id=video_id)
        db.session.add(playlist)
        db.session.commit()

        return playlist.video_id

    @swagger.operation(
        notes="Returns the playlist of the room",
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
                "message": "Returned the playlist of the room"
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
            return jsonify(self.__get_playlist(room_id))
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __get_playlist(self, room_id):
        playlist = Playlist.query.filter_by(room_id=room_id).all()
        if playlist is None:
            raise LookupError("Room not found")
        return [video.to_json() for video in playlist]

class PlaylistApi(Resource):
    @swagger.operation(
        notes="Removes a video from the playlist",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to remove the video from",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "path"
            }, {
                "name": "video_id",
                "description": "id of the video to remove",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            }
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Removed the video from the playlist"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def delete(self, room_id, video_id):
        try:
            self.__delete_video_from_playlist(room_id, video_id)
            return jsonify(success=True)
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __delete_video_from_playlist(self, room_id, video_id):
        video = Playlist.query.filter_by(room_id=room_id, video_id=video_id).first()
        if video is None:
            raise LookupError("Video not found")
        db.session.delete(video)
        db.session.commit()
        return