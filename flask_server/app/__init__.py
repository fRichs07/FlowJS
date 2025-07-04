from flask import Flask
from .db import init_db
from .routes import init_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Configure app (can be expanded)
    app.config['MONGO_URI'] = "mongodb://mongodb:27017/flow"  # or use an env var

    # Initialize MongoDB connection
    init_db(app)

    # Register routes
    init_routes(app)

    return app
