from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_restful_swagger import swagger
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
api = swagger.docs(Api(app), apiVersion="0.1")
CORS(app)
db = SQLAlchemy(app)

from app import endpoints
from app.models import *

api.add_resource(endpoints.user.UserListAPI, "/users")
api.add_resource(endpoints.user.UserAPI, "/users/<int:user_id>")
api.add_resource(endpoints.room.RoomListAPI, "/rooms")
api.add_resource(endpoints.room.RoomAPI, "/rooms/<int:room_id>")
api.add_resource(endpoints.room_user.RoomUserAPI, "/rooms/<int:room_id>/users/<int:user_id>")
api.add_resource(endpoints.room_user.RoomUserListAPI, "/rooms/<int:room_id>/users")