from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_restful_swagger import swagger
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from app.endpoints import initialize_routes
from config import Config


def create_app(for_testing=False):
    app = Flask(__name__)
    app.config.from_object(Config)
    if for_testing:
        app.config['TESTING'] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    else:
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///production.db"
    app.app_context().push()
    CORS(app)
    api = swagger.docs(Api(app), apiVersion="0.1")

    db.init_app(app)
    try:
        db.drop_all(app=app)
    except:
        pass
    finally:
        db.create_all(app=app)
    initialize_routes(api)
    return app