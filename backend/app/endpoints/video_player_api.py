class VideoVolumeAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("video_volume", type=float, required=False, default=0.5, location="json")
        super(VideoPlayerAPI, self).__init__()

    @swagger.operation(
        notes="Returns the volume of the video player",
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
                "code": 200,
                "message": "Returned the volume of the video player"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self, room_id):
        try:
            return jsonify(self.__get_volume(room_id))
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __get_volume(self, room_id):
        room = Room.query.get(room_id)
        if room is None:
            raise LookupError("Room not found")
        return room.video_volume.to_json()s
            