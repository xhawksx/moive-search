from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MovieSearch(BaseModel):
    userName: str
    movieName: str

class MovieResult(BaseModel):
    name: str
    runtimeInMinutes: Optional[int]
    budgetInMillions: Optional[float]
    boxOfficeRevenueInMillions: Optional[float]
    academyAwardNominations: Optional[int]
    academyAwardWins: Optional[int]
    rottenTomatoesScore: Optional[float]

class SearchResponse(BaseModel):
    success: bool
    movies: List[MovieResult]

class HistoryItem(BaseModel):
    user_name: str
    movie_name: str
    results: List[dict]
    timestamp: datetime
