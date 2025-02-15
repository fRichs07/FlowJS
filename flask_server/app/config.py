import os

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://mongodb:27017/flow')
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')  # Example of another config
