from flask import jsonify, request
from flask_restful import Resource, reqparse
from app import api, db
from app.models.room import Room

class RoomListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        self.reqparse.add_argument("video_id", type=str, required=False, default="", location="json")
        super(RoomListAPI, self).__init__()

    def get(self):
        return jsonify([
            {
                "id": x.id,
                "name": x.name,
                "video_id": x.video_id,
            }
            for x in Room.query.all()
        ])

    def post(self):
        args = self.reqparse.parse_args()
        room = Room(name=args["name"], video_id=args["video_id"])
        db.session.add(room)
        db.session.commit()
        return jsonify({
            "id": room.id,
            "name": room.name,
            "video_id": room.video_id
        })

class RoomAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        self.reqparse.add_argument("video_id", type=str, required=False, default="", location="json")
        super(RoomAPI, self).__init__()

    def get(self, room_id):
        room = Room.query.get(room_id)
        return jsonify({
            "id": room.id,
            "name": room.name,
            "video_id": room.video_id,
        })

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

    def delete(self, room_id):
        room = Room.query.get(room_id)
        db.session.delete(room)
        db.session.commit()
        return jsonify(success=True)
