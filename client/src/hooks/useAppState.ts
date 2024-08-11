import { useState, useEffect } from 'react';

export const useAppState = () => {
  const [money, setMoney] = useState<number>(() => {
    const savedMoney = localStorage.getItem('money');
    return savedMoney ? parseFloat(savedMoney) : 0;
  });

  const [totalIncomePerHour, setTotalIncomePerHour] = useState<number>(() => {
    const savedIncome = localStorage.getItem('totalIncomePerHour');
    return savedIncome ? parseFloat(savedIncome) : 0;
  });

  const [offlineEarnings, setOfflineEarnings] = useState<number>(0);
  const [showEarningsModal, setShowEarningsModal] = useState<boolean>(false);
  const [maxLevelReached, setMaxLevelReached] = useState<boolean>(() => {
    return localStorage.getItem('maxLevelReached') === 'true';
  });

  useEffect(() => {
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(lastVisitTime, 10);
      const secondsPassed = timeDifference / 1000;
      const earnings = (totalIncomePerHour / 3600) * secondsPassed;
      if (earnings > 0) {
        setOfflineEarnings(Number(earnings.toFixed(2)));
        setShowEarningsModal(true);
      }
    }
  }, [totalIncomePerHour]);

  useEffect(() => {
    const saveVisitTime = () => {
      localStorage.setItem('lastVisitTime', new Date().getTime().toString());
    };
    window.addEventListener('beforeunload', saveVisitTime);

    return () => {
      window.removeEventListener('beforeunload', saveVisitTime);
      saveVisitTime();
    };
  }, []);

  const collectEarnings = () => {
    setMoney(prevMoney => prevMoney + offlineEarnings);
    localStorage.setItem('money', (money + offlineEarnings).toString());
    setOfflineEarnings(0);
    setShowEarningsModal(false);
  };

  const levelThresholds = [
    500,    
    2000,    
    5000,   
    15000,   
    50000,  
    100000  
  ];

  const getFilledCircles = () => {
    const filledCount = levelThresholds.filter(threshold => money >= threshold).length;
    if (filledCount >= 6 && !maxLevelReached) {
      setMaxLevelReached(true);
      localStorage.setItem('maxLevelReached', 'true');
    }
    return Array.from({ length: 6 }, (_, index) => index < filledCount);
  };

  return {
    money,
    setMoney,
    totalIncomePerHour,
    setTotalIncomePerHour,
    offlineEarnings,
    showEarningsModal,
    maxLevelReached,
    collectEarnings,
    getFilledCircles,
  };
};
