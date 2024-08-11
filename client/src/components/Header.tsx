import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  money: number;
  totalIncomePerHour: number;
  maxLevelReached: boolean;
  getFilledCircles: () => boolean[];
}

const Header: React.FC<HeaderProps> = ({ money, totalIncomePerHour, maxLevelReached, getFilledCircles }) => {
  const coin = require("../assets/images/coin.png");
  const pick = require("../assets/images/pick.png");
  const home = require("../assets/images/home.png");
  const maining = require("../assets/images/maining.png");

  return (
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
  );
}

export default Header;
