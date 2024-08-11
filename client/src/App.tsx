import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CardsPage from './pages/CardsPage';
import './App.css';

const App: React.FC = () => {
  const [money, setMoney] = useState<number>(() => {
    const savedMoney = localStorage.getItem('money');
    return savedMoney ? parseFloat(savedMoney) : 0;
  });

  const [totalIncomePerHour, setTotalIncomePerHour] = useState<number>(0);

  return (
    <Router>
      <div className="app-cont">
        <header className="header">
          <div className="header-content">
            <div className="income-display">
              <h1>Total Income per Hour: {totalIncomePerHour}</h1>
              <h2>Money: {Math.floor(money)}</h2>
            </div>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/cards">Cards</Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={<Homepage money={money} setMoney={setMoney} totalIncomePerHour={totalIncomePerHour} />}
          />
          <Route
            path="/cards"
            element={<CardsPage money={money} setMoney={setMoney} totalIncomePerHour={totalIncomePerHour} setTotalIncomePerHour={setTotalIncomePerHour} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
