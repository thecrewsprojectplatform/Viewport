from flask import make_response, jsonify

def create_400_error(custom_message=None):
    return create_error(custom_message if custom_message is not None else "Bad request", 400)

def create_404_error(custom_message=None):
    return create_error(custom_message if custom_message is not None else "Resource not found", 404)

def create_500_error(custom_message=None):
    return create_error(custom_message if custom_message is not None else "Internal server error", 500)

def create_error(error_message, status_code):
    return make_response(jsonify(error_message), status_code)
