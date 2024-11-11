import React, { useState, useEffect } from 'react';
import { getSearchHistory } from '../services/api';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getSearchHistory();
        setHistory(response.history);
      } catch (err) {
        setError('Failed to load search history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search History</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Nome</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Pesquisa</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Resultado</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Data e Hora da Consulta</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.user_name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.movie_name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.results.map(movie => movie.name).join(', ')}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {new Date(item.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
