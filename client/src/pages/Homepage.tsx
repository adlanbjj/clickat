import React, { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";

interface HomepageProps {
  money: number;
  setMoney: (money: number) => void;
  totalIncomePerHour: number;
}

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

const Homepage: React.FC<HomepageProps> = ({ money, setMoney, totalIncomePerHour }) => {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showCongratsText, setShowCongratsText] = useState<boolean>(false);
  const [maxLevelReached, setMaxLevelReached] = useState<boolean>(() => {
    return localStorage.getItem('maxLevelReached') === 'true';
  });
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  const avatars = [
    require("../assets/images/cuc1.jpg"),
    require("../assets/images/cuc2.jpg"),
    require("../assets/images/cuc3.jpg"),
    require("../assets/images/cuc4.jpg"),
    require("../assets/images/cuc5.jpg"),
    require("../assets/images/cuc6.jpg")
  ];

  const moneyRef = useRef<number>(money);
  moneyRef.current = money;

  useEffect(() => {
    const incomePerSecond = totalIncomePerHour / 3600;

    if (!isNaN(incomePerSecond) && incomePerSecond > 0) {
      const timer = setInterval(() => {
        const currentMoney = moneyRef.current;
        const newMoney = currentMoney + incomePerSecond;
        setMoney(Number(newMoney.toFixed(2)));
        localStorage.setItem('money', newMoney.toFixed(2));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [totalIncomePerHour, setMoney]);

  useEffect(() => {
    if (Math.floor(money / 10) >= 6 && !maxLevelReached) {
      setMaxLevelReached(true);
      localStorage.setItem('maxLevelReached', 'true');
    }
  }, [money, maxLevelReached]);

  const handleClick = (e: React.MouseEvent) => {
    const newMoney: number = money + 1;
    setMoney(newMoney);
    localStorage.setItem('money', newMoney.toString());

    const { clientX, clientY } = e;
    const newClickEffect: ClickEffect = {
      id: Date.now(),
      x: clientX,
      y: clientY,
    };
    setClickEffects([...clickEffects, newClickEffect]);

    setTimeout(() => {
      setClickEffects((effects) => effects.filter(effect => effect.id !== newClickEffect.id));
    }, 1000);

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
    const index = maxLevelReached ? 5 : Math.floor(money / 10);
    return avatars[index];
  };

  const getFilledCircles = () => {
    const filledCount = maxLevelReached ? 6 : Math.floor(money / 10);
    return Array.from({ length: 6 }, (_, index) => index < filledCount);
  };

  const filledCount = maxLevelReached ? 6 : Math.floor(money / 10);

  return (
    <div className="home-container" onClick={handleClick}>
      {showConfetti && <Confetti />}
      {showCongratsText && (
        <div className="congrats-text">
          Congratulations, you've reached a new level!
        </div>
      )}
      {clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="click-effect"
          style={{ top: effect.y, left: effect.x }}
        >
          +1
        </div>
      ))}
      <div className="header-block">
        <div className="steps-cont">
          <span>{filledCount}/6</span>

          {getFilledCircles().map((filled, index) => (
            <div key={index} className={`step ${filled ? 'filled' : ''}`}></div>
          ))}
        </div>
        Money: {Math.floor(money)}
      </div>
      <div className="body-block">
        <div className="circle-avatar-image">
          <img src={getAvatar()} alt="avatar" className="def-avatar" />
        </div>
      </div>
      <div className="footer-block">
        {maxLevelReached && (
          <div className="final-message">
            Congratulations, you've successfully unlocked all levels! 
            More levels will be added in the future, so keep saving money 
            and get ready for new challenges!
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
