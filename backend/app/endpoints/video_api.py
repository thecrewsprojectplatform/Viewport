from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask_restful_swagger import swagger
from werkzeug.exceptions import BadRequest
from typing import List
from app import db
from app.database.video import Video
from app.endpoints.utils import create_400_error, create_404_error, create_500_error


class VideoListApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("url", type=str, required=True, location="json")
        super(VideoListApi, self).__init__()

    @swagger.operation(
        notes="Creates a new video",
        parameters=[
            {
                "name": "url",
                "description": "Url of the video",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Created the new video successfully"
            }, {
                "code": 400,
                "message": "Bad request",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def post(self):
        try:
            args = self.reqparse.parse_args()
            return jsonify(self.__create_video(args["url"]))
        except BadRequest:
            return create_400_error()
        except:
            return create_500_error()
    def __create_video(self, url):
        video = Video(url=url)
        db.session.add(video)
        db.session.commit()
        return video.to_json()


class VideoApi(Resource):
    @swagger.operation(
        notes="Returns the specific video",
        parameters=[
            {
                "name": "video_id",
                "description": "ID of the video to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Returned the video"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self, video_id):
        try:
            return jsonify(self.__get_video(video_id))
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __get_video(self, video_id):
        video = Video.query.get(video_id)
        if video is None:
            raise LookupError("Video not found")
        return video.to_json()

    @swagger.operation(
        notes="Deletes the specific video",
        parameters=[
            {
                "name": "video_id",
                "description": "ID of the video to delete",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Deleted the video"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def delete(self, video_id):
        try:
            self.__delete_video(video_id)
            return jsonify(success=True)
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __delete_video(self, video_id):
        video = Video.query.get(video_id)
        if video is None:
            raise LookupError("Video not found")
        db.session.delete(video)
        db.session.commit()
        return