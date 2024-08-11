import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  name: string;
  incomePerHour: number;
  cost: number;
}

interface CardsPageProps {
  money: number;
  setMoney: (money: number) => void;
  totalIncomePerHour: number;
  setTotalIncomePerHour: (income: number) => void;
}

const initialCardsData: Card[] = [
  { id: 1, name: "Card 1", incomePerHour: 1500, cost: 500 },
  { id: 2, name: "Card 2", incomePerHour: 5000, cost: 2500 },
  { id: 3, name: "Card 3", incomePerHour: 15000, cost: 5000 },
  { id: 4, name: "Card 4", incomePerHour: 50000, cost: 15000 },
  { id: 5, name: "Card 5", incomePerHour: 100000, cost: 30000 },
];

const CardsPage: React.FC<CardsPageProps> = ({
  money,
  setMoney,
  totalIncomePerHour,
  setTotalIncomePerHour,
}) => {
  const [availableCards, setAvailableCards] = useState<Card[]>(() => {
    const savedAvailableCards = localStorage.getItem('availableCards');
    return savedAvailableCards ? JSON.parse(savedAvailableCards) : initialCardsData;
  });

  const [myCards, setMyCards] = useState<Card[]>(() => {
    const savedMyCards = localStorage.getItem('myCards');
    return savedMyCards ? JSON.parse(savedMyCards) : [];
  });

  useEffect(() => {
    localStorage.setItem('availableCards', JSON.stringify(availableCards));
  }, [availableCards]);

  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(myCards));
  }, [myCards]);

  useEffect(() => {
    localStorage.setItem('totalIncomePerHour', totalIncomePerHour.toString());
  }, [totalIncomePerHour]);

  const handleBuyCard = (cardId: number, cost: number, incomePerHour: number) => {
    if (money >= cost) {
      const newMoney = money - cost;
      setMoney(newMoney);
      
      const updatedIncome = totalIncomePerHour + incomePerHour;
      setTotalIncomePerHour(updatedIncome);
      localStorage.setItem('totalIncomePerHour', updatedIncome.toString());

      const purchasedCard = availableCards.find(card => card.id === cardId);
      if (purchasedCard) {
        setMyCards([...myCards, purchasedCard]);
        setAvailableCards(availableCards.filter(card => card.id !== cardId));
      }
    } else {
      alert("Not enough money to buy this card.");
    }
  };

  return (
    <div className="cards-page">
              <h2>Available Cards</h2>

      <div className="cards-container">
        {availableCards.length > 0 ? (
          availableCards.map((card) => (
            <div key={card.id} className="card">
              <h3>{card.name}</h3>
              <p>Per hour: {card.incomePerHour} $</p>
              <p>Cost: {card.cost} $</p>
              <button
                onClick={() => handleBuyCard(card.id, card.cost, card.incomePerHour)}
              >
                Buy
              </button>
            </div>
          ))
        ) : (
          <p>No more cards available for purchase.</p>
        )}
      </div>
      <h2>My Cards</h2>

      <div className="my-cards-container">
        {myCards.length > 0 ? (
          myCards.map((card) => (
            <div key={card.id} className="card">
              <h3>{card.name}</h3>
              <p>Per hour: {card.incomePerHour} $</p>
            </div>
          ))
        ) : (
          <p>You haven't purchased any cards yet.</p>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
