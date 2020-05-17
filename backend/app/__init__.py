from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)
db = SQLAlchemy(app)

from app import endpoints
from app.models import *

api.add_resource(endpoints.user.UserListAPI, "/users")
api.add_resource(endpoints.user.UserAPI, "/users/<string:user_id>")
api.add_resource(endpoints.room.RoomListAPI, "/rooms")
api.add_resource(endpoints.room.RoomAPI, "/rooms/<string:room_id>")
api.add_resource(endpoints.room_user.RoomUserAPI, "/rooms/<string:room_id>/users")