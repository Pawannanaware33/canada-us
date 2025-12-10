import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { CityProvider } from './context/CityContext';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <DataProvider>
        <CurrencyProvider>
          <CityProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </CityProvider>
        </CurrencyProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
