from flask import Flask
from .db import init_db
from .routes import init_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)  # Attiva CORS per tutte le richieste

    # Configure app (can be expanded)
    app.config['MONGO_URI'] = "mongodb://mongodb:27017/flow"  # or use an env var

    # Initialize MongoDB connection
    init_db(app)

    # Register routes
    init_routes(app)

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    return app
