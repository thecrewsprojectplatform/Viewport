from flask_restful import Api, abort

class CustomApi(Api):

    def handle_error(self, e):
        abort(e.code, str(e))