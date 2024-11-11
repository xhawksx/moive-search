from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
import requests
from datetime import datetime
from models.models import MovieSearch, SearchResponse
from config import MONGODB_URI, DATABASE_NAME, COLLECTION_NAME, ONE_API_TOKEN
import logging
import pymongo

logger = logging.getLogger(__name__)
logger.setLevel(logging.ERROR)

router = APIRouter()
client = AsyncIOMotorClient(MONGODB_URI)
db = client[DATABASE_NAME][COLLECTION_NAME]

@router.post("/search", response_model=SearchResponse)
async def search_movie(search: MovieSearch):
    if not search.userName or not search.movieName:
        raise HTTPException(status_code=400, detail="Missing required fields")

    try:
        # Call The One API
        headers = {'Authorization': f'Bearer {ONE_API_TOKEN}'}
        api_url = 'https://the-one-api.dev/v2/movie'
        
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        movies = response.json().get('docs', [])
        
        # Filter movies by name (case-insensitive)
        filtered_movies = [
            movie for movie in movies 
            if search.movieName.lower() in movie.get('name', '').lower()
        ]

        # Save search to database
        await db.insert_one({
            'user_name': search.userName,
            'movie_name': search.movieName,
            'results': filtered_movies,
            'timestamp': datetime.now()
        })

        return {
            'success': True,
            'movies': filtered_movies
        }

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_history():
    try:
        cursor = db.find({}).sort('timestamp', -1)
        history = await cursor.to_list(length=100)
        
        # Convert ObjectId to string for JSON serialization
        for item in history:
            item['_id'] = str(item['_id'])
        
        return {
            'success': True,
            'history': history
        }
    except pymongo.errors.ConnectionFailure as e:
        logger.error(f"Erro de conexão com o MongoDB: {e}")
        raise HTTPException(status_code=503, detail="Serviço do MongoDB indisponível")

    except Exception as e:
        logger.error(f"Erro ao recuperar o histórico: {e}")
        raise HTTPException(status_code=500, detail=str(e))
