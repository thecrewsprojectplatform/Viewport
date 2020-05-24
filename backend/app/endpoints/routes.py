from app.endpoints.user_api import UserListApi, UserApi
from app.endpoints.room_api import RoomListApi, RoomApi
from app.endpoints.room_user_api import RoomUserListApi, RoomUserApi

def initialize_routes(api):
    api.add_resource(UserListApi, "/users")
    api.add_resource(UserApi, "/users/<int:user_id>")
    api.add_resource(RoomListApi, "/rooms")
    api.add_resource(RoomApi, "/rooms/<int:room_id>")
    api.add_resource(RoomUserApi, "/rooms/<int:room_id>/users/<int:user_id>")
    api.add_resource(RoomUserListApi, "/rooms/<int:room_id>/users")