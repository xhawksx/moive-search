const API_BASE_URL = 'http://localhost:5000/api';

export const searchMovie = async (userName, movieName) => {
  const response = await fetch(`${API_BASE_URL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, movieName }),
  });

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
};

export const getSearchHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/history`);

  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
};
