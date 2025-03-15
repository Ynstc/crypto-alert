import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContext } from './context/Context';
import Monitor from './pages/Monitor';
import Alerts from './pages/Alerts';
import { Navigation } from './components/navigation/Navigation';

export const App: React.FC = () => {
  return (
    <GlobalContext>
      <Router>
        <div className="app-container">
          <Navigation />
          <div className="app">
            <Routes>
              <Route path="/" element={<Monitor />} />
              <Route path="/alerts" element={<Alerts />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalContext>
  );
};
