import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost/')
DATABASE_NAME = 'movie_search_db'
COLLECTION_NAME = 'search_history'
ONE_API_TOKEN = os.getenv('ONE_API_TOKEN', '')  # Token from https://the-one-api.dev/
