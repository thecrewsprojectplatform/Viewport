from flask import jsonify, request
from flask_restful import Resource, reqparse, marshal_with
from flask_restful_swagger import swagger
from app import api, db
from app.models.room import Room

class RoomListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        self.reqparse.add_argument("video_id", type=str, required=False, default="", location="json")
        super(RoomListAPI, self).__init__()

    @marshal_with(Room.resource_fields)
    @swagger.operation(
        notes="Returned all rooms",
        responseClass=Room.__name__,
        parameters=[],
        responseMessages=[
            {
                "code": 201,
                "message": "Got all of the rooms"
            },
        ]
    )
    def get(self):
        return jsonify([
            {
                "id": x.id,
                "name": x.name,
                "video_id": x.video_id,
            }
            for x in Room.query.all()
        ])

    @marshal_with(Room.resource_fields)
    @swagger.operation(
        notes="Creates a new room",
        responseClass=Room.__name__,
        parameters=[
            {
                "name": "name",
                "description": "Name of the room to add",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            }, {
                "name": "video_id",
                "description": "ID of the video to use in the room",
                "required": False,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Created the new room successfully"
            },
        ]
    )
    def post(self):
        args = self.reqparse.parse_args()
        room = Room(name=args["name"], video_id=args["video_id"])
        db.session.add(room)
        db.session.commit()
        return jsonify({
            "id": room.id,
            "name": room.name,
            "video_id": room.video_id,
        })

class RoomAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        self.reqparse.add_argument("video_id", type=str, required=False, default="", location="json")
        super(RoomAPI, self).__init__()

    @marshal_with(Room.resource_fields)
    @swagger.operation(
        notes="Returned the specific room",
        responseClass=Room.__name__,
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
                "code": 201,
                "message": "Returned the room"
            },
        ]
    )
    def get(self, room_id):
        room = Room.query.get(room_id)
        return jsonify({
            "id": room.id,
            "name": room.name,
            "video_id": room.video_id,
        })

    @marshal_with(Room.resource_fields)
    @swagger.operation(
        notes="Updated the specific room",
        responseClass=Room.__name__,
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to update",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
            {
                "name": "name",
                "description": "Name to update room with",
                "required": False,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
            {
                "name": "video_id",
                "description": "ID of video to update room with",
                "required": False,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Updated the room"
            }
        ]
    )
    def put(self, room_id):
        room = Room.query.get(room_id)
        args = self.reqparse.parse_args()
        for k, v in self.reqparse.parse_args().items():
            if v is not None:
                setattr(room, k, v)
        db.session.commit()
        return jsonify({
            "id": room.id,
            "name": room.name,
            "video_id": room.video_id,
        })

    @swagger.operation(
        notes="Deletes the specific room",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to delete",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 201,
                "message": "Deleted the room"
            }
        ]
    )
    def delete(self, room_id):
        room = Room.query.get(room_id)
        db.session.delete(room)
        db.session.commit()
        return jsonify(success=True)
