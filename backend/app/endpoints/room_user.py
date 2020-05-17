from flask import jsonify, request
from flask_restful import Resource, reqparse
from app import api, db
from app.models.room_user import RoomUser
from app.models.user import User

class RoomUserAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("user_id", type=str, required=False, default="", location="json")
        super(RoomUserAPI, self).__init__()

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

    def post(self, room_id):
        args = self.reqparse.parse_args()
        room_user = RoomUser(room_id=room_id, user_id=args["user_id"])
        db.session.add(room_user)
        db.session.commit()
        return jsonify(success=True)

    def delete(self, room_id):
        args = self.reqparse.parse_args()
        room_user = RoomUser.query.filter_by(room_id=room_id, user_id=args["user_id"])
        db.session.delete(room_user)
        db.session.commit()
        return jsonify(success=True)