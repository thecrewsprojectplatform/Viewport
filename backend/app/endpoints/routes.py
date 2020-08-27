from app.endpoints.playlist_api import CreatePlaylistApi, PlaylistApi
from app.endpoints.room_api import RoomListApi, RoomApi
from app.endpoints.user_api import UserListApi, UserApi
from app.endpoints.room_user_api import RoomUserListApi, RoomUserApi
from app.endpoints.video_api import VideoListApi, VideoApi
from app.endpoints.video_player_api import VideoStateApi, VideoTimeApi, VideoUrlApi

def initialize_routes(api):
    api.add_resource(RoomListApi, "/rooms")
    api.add_resource(RoomApi, "/rooms/<string:room_id>")
    api.add_resource(UserListApi, "/users")
    api.add_resource(UserApi, "/users/<int:user_id>")
    api.add_resource(RoomUserListApi, "/rooms/<string:room_id>/users")
    api.add_resource(RoomUserApi, "/rooms/<string:room_id>/users/<int:user_id>")
    api.add_resource(VideoListApi, "/videos")
    api.add_resource(VideoApi, "/videos/<int:video_id>")
    api.add_resource(CreatePlaylistApi, "/rooms/<string:room_id>/playlist")
    api.add_resource(PlaylistApi, "/rooms/<string:room_id>/playlist/<int:video_id>")
    api.add_resource(VideoStateApi, "/rooms/<string:room_id>/video_state")
    api.add_resource(VideoTimeApi, "/rooms/<string:room_id>/video_time")
    api.add_resource(VideoUrlApi, "/rooms/<string:room_id>/video_url")