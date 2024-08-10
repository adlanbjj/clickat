import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Homepage: React.FC = () => {
  const [money, setMoney] = useState<number>(() => {
    const savedMoney = localStorage.getItem('money');
    return savedMoney ? parseInt(savedMoney, 10) : 0;
  });

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showCongratsText, setShowCongratsText] = useState<boolean>(false);
  const [showFinalMessage, setShowFinalMessage] = useState<boolean>(false);
  const [maxLevelReached, setMaxLevelReached] = useState<boolean>(false);

  const avatars = [
    require("../assets/images/cuc1.jpg"),
    require("../assets/images/cuc2.jpg"),
    require("../assets/images/cuc3.jpg"),
    require("../assets/images/cuc4.jpg"),
    require("../assets/images/cuc5.jpg"),
    require("../assets/images/cuc6.jpg")
  ];

  useEffect(() => {
    if (Math.floor(money / 10) >= 6) {
      setMaxLevelReached(true);
      setShowFinalMessage(true);
      setTimeout(() => setShowFinalMessage(false), 5000);
    }
  }, [money]);

  const handleClick = (e: React.MouseEvent) => {
    if (maxLevelReached) return;

    const newMoney: number = money + 1;
    setMoney(newMoney);
    localStorage.setItem('money', newMoney.toString());

    if (newMoney % 10 === 0 && Math.floor(newMoney / 10) < 6) {
      setShowConfetti(true);
      setShowCongratsText(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowCongratsText(false);
      }, 3000);
    }
  };

  const getAvatar = () => {
    const index = Math.min(Math.floor(money / 10), 5);
    return avatars[index];
  };

  const getFilledCircles = () => {
    const filledCount = Math.min(Math.floor(money / 10), 6);
    return Array.from({ length: 6 }, (_, index) => index < filledCount);
  };

  const filledCount = Math.min(Math.floor(money / 10), 6);

  return (
    <div className="home-container">
      {showConfetti && <Confetti />}
      {showCongratsText && (
        <div className="congrats-text">
          Congratulations, you've reached a new level!
        </div>
      )}
      {showFinalMessage && (
        <div className="final-message">
          Congratulations, you've successfully unlocked
           all levels! More levels will be added in the future !
        </div>
      )}
      <div className="header-block">
        <div className="steps-cont">
          <span>{filledCount}/6</span>

          {getFilledCircles().map((filled, index) => (
            <div key={index} className={`step ${filled ? 'filled' : ''}`}></div>
          ))}
        </div>
        Money: {money}
      </div>
      <div className="body-block">
        <div className="circle-avatar-image" onClick={handleClick}>
          <img src={getAvatar()} alt="avatar" className="def-avatar" />
        </div>
      </div>
      <div className="footer-block"></div>
    </div>
  );
};

export default Homepage;
