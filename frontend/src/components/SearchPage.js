import React, { useState } from 'react';
import { searchMovie } from '../services/api';

function SearchPage() {
  const [userName, setUserName] = useState('');
  const [movieName, setMovieName] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await searchMovie(userName, movieName);
      setResults(response.movies);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Movies</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Your Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            Movie Name:
            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>
          <ul>
            {results.map((movie, index) => (
              <li key={index}>{movie.name} - {movie.runtimeInMinutes} minutes</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
