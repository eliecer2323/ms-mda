from flask import Flask

from models import db

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///clientes.db"
    app.config["SECRET_KEY"] = "123"
    app.app_context().push()
    db.init_app(app)
    db.create_all()

    return app