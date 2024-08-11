import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CardsPage from './pages/CardsPage';
import './App.css';

const App: React.FC = () => {
  const [money, setMoney] = useState<number>(() => {
    const savedMoney = localStorage.getItem('money');
    return savedMoney ? parseFloat(savedMoney) : 0;
  });

  const coin = require("../src/assets/images/coin.png");
  const pick = require("../src/assets/images/pick.png");
  const home = require("../src/assets/images/home.png");
  const maining = require("../src/assets/images/maining.png");

  const [totalIncomePerHour, setTotalIncomePerHour] = useState<number>(() => {
    const savedIncome = localStorage.getItem('totalIncomePerHour');
    return savedIncome ? parseFloat(savedIncome) : 0;
  });

  const [maxLevelReached, setMaxLevelReached] = useState<boolean>(() => {
    return localStorage.getItem('maxLevelReached') === 'true';
  });

  const levelThresholds = [
    10000,   
    50000,    
    200000,  
    500000,    
    1000000,  
    10000000  
  ];

  useEffect(() => {
    const filledCount = levelThresholds.filter(threshold => money >= threshold).length;
    if (filledCount >= 6 && !maxLevelReached) {
      setMaxLevelReached(true);
      localStorage.setItem('maxLevelReached', 'true');
    }
  }, [money, maxLevelReached, levelThresholds]);

  const getFilledCircles = () => {
    const filledCount = levelThresholds.filter(threshold => money >= threshold).length;
    return Array.from({ length: 6 }, (_, index) => index < filledCount);
  };

  const updateTotalIncomePerHour = (newIncome: number) => {
    const updatedIncome = totalIncomePerHour + newIncome;
    setTotalIncomePerHour(updatedIncome);
    localStorage.setItem('totalIncomePerHour', updatedIncome.toString());
  };

  const updateMoney = (newMoney: number) => {
    setMoney(newMoney);
    localStorage.setItem('money', newMoney.toString());
  };

  return (
    <Router>
      <div className="app-cont">
        <header className="header">
          <div className="header-content">
            <div className="income-display">
              <h1><img src={pick} alt="pick" /> {totalIncomePerHour} $/h</h1>
              <h2><img src={coin} alt="coin" /> {Math.floor(money)} $</h2>
            </div>
            <div className="steps-cont">
              <span>{getFilledCircles().filter(Boolean).length}/6</span>
              {getFilledCircles().map((filled, index) => (
                <div key={index} className={`step ${filled ? 'filled' : ''}`}></div>
              ))}
            </div>
            <nav>
              <Link to="/"><img src={home} alt="home" /></Link>
              <Link to="/cards"><img src={maining} alt="maining" /></Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={<Homepage money={money} setMoney={updateMoney} totalIncomePerHour={totalIncomePerHour} />}
          />
          <Route
            path="/cards"
            element={<CardsPage money={money} setMoney={updateMoney} totalIncomePerHour={totalIncomePerHour} setTotalIncomePerHour={updateTotalIncomePerHour} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
