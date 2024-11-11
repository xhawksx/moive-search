import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import HistoryPage from './components/HistoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '20px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '20px' }}>Search</Link>
          <Link to="/history">History</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
