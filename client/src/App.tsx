import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CardsPage from './pages/CardsPage';
import Header from './components/Header';
import EarningsModal from './components/EarningsModal';
import { useAppState } from './hooks/useAppState';
import './App.css';

const App: React.FC = () => {
  const {
    money,
    setMoney,
    totalIncomePerHour,
    setTotalIncomePerHour,
    offlineEarnings,
    showEarningsModal,
    maxLevelReached,
    collectEarnings,
    getFilledCircles,
  } = useAppState();

  return (
    <Router>
      <div className="app-cont">
        <Header
          money={money}
          totalIncomePerHour={totalIncomePerHour}
          maxLevelReached={maxLevelReached}
          getFilledCircles={getFilledCircles}
        />
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

        {showEarningsModal && (
          <EarningsModal
            offlineEarnings={offlineEarnings}
            collectEarnings={collectEarnings}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
