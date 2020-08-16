from app.endpoints.playlist_api import CreatePlaylistApi, PlaylistApi
from app.endpoints.room_api import RoomListApi, RoomApi
from app.endpoints.user_api import UserListApi, UserApi
from app.endpoints.room_user_api import RoomUserListApi, RoomUserApi
from app.endpoints.video_player_api import VideoStateApi, VideoTimeApi, VideoUrlApi

def initialize_routes(api):
    api.add_resource(UserListApi, "/users")
    api.add_resource(UserApi, "/users/<int:user_id>")
    api.add_resource(RoomListApi, "/rooms")
    api.add_resource(RoomApi, "/rooms/<int:room_id>")
    api.add_resource(VideoStateApi, "/rooms/<int:room_id>/video_state")
    api.add_resource(VideoTimeApi, "/rooms/<int:room_id>/video_time")
    api.add_resource(VideoUrlApi, "/rooms/<int:room_id>/video_url")
    api.add_resource(CreatePlaylistApi, "/rooms/<int:room_id>/playlist")
    api.add_resource(PlaylistApi, "/rooms/<int:room_id>/playlist/<int:video_url>")
    api.add_resource(RoomUserApi, "/rooms/<int:room_id>/users/<int:user_id>")
    api.add_resource(RoomUserListApi, "/rooms/<int:room_id>/users")