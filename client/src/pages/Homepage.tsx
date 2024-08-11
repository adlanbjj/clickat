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
  const [boostLevel, setBoostLevel] = useState<number>(() => {
    const savedBoostLevel = localStorage.getItem('boostLevel');
    return savedBoostLevel ? parseInt(savedBoostLevel, 10) : 0;
  });

  const boostPrices = [500, 2000, 10000, 50000, 100000];
  const boostMultipliers = [1, 5, 10, 15, 20, 25];

  const avatars = [
    require("../assets/images/cuc1.jpg"),
    require("../assets/images/cuc2.jpg"),
    require("../assets/images/cuc3.jpg"),
    require("../assets/images/cuc4.jpg"),
    require("../assets/images/cuc5.jpg"),
    require("../assets/images/cuc6.jpg")
  ];

  const levelThresholds = [
    10000,    
    50000,    
    200000,   
    500000,   
    1000000,   
    10000000   
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
    const currentLevel = levelThresholds.findIndex(threshold => money < threshold);

    if (currentLevel === -1 && !maxLevelReached) {
      setMaxLevelReached(true);
      localStorage.setItem('maxLevelReached', 'true');
    } else if (currentLevel !== -1 && Math.floor(money / levelThresholds[currentLevel]) >= 1) {
      setShowConfetti(true);
      setShowCongratsText(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowCongratsText(false);
      }, 3000);
    }
  }, [money, maxLevelReached, levelThresholds]);

  const handleClick = (e: React.MouseEvent) => {
    const newMoney: number = money + boostMultipliers[boostLevel];
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
  };

  const handleBoostUpgrade = () => {
    if (boostLevel < 5 && money >= boostPrices[boostLevel]) {
      const newMoney = money - boostPrices[boostLevel];
      setMoney(newMoney);
      localStorage.setItem('money', newMoney.toString());

      const newBoostLevel = boostLevel + 1;
      setBoostLevel(newBoostLevel);
      localStorage.setItem('boostLevel', newBoostLevel.toString());
    } else if (boostLevel >= 5) {
      alert("You have reached the maximum boost level!");
    } else {
      alert("Not enough money to upgrade!");
    }
  };

  const getAvatar = () => {
    const currentLevel = levelThresholds.findIndex(threshold => money < threshold);
    const index = currentLevel === -1 ? 5 : currentLevel;
    return avatars[index];
  };

  return (
    <div className="home-container">
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
          +{boostMultipliers[boostLevel]}
        </div>
      ))}
      <div className="body-block">
        <div className="circle-avatar-image" onClick={handleClick}>
          <img src={getAvatar()} alt="avatar" className="def-avatar" />
        </div>
        <button className="boost-button" onClick={handleBoostUpgrade}>
          Boost ({boostLevel}/5) - {boostLevel < 5 ? boostPrices[boostLevel] : "Max"} $
        </button>
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
