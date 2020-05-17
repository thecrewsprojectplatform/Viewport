from flask import jsonify, request
from flask_restful import Resource, reqparse
from app import api, db
from app.models.user import User
from app.models.room_user import RoomUser

class UserListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        self.reqparse.add_argument("room_id", type=str, required=False, default="", location="json")
        super(UserListAPI, self).__init__()

    def get(self):
        return jsonify([
            {
                "id": x.id,
                "name": x.name,
            }
            for x in User.query.all()
        ])

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

    def get(self, user_id):
        user = User.query.get(user_id)
        return jsonify({
            "id": user.id,
            "name": user.name,
        })

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

    def delete(self, user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify(success=True)
