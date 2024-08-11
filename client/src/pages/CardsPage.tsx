import React from 'react';

interface CardsPageProps {
  money: number;
  setMoney: (money: number) => void;
  totalIncomePerHour: number;
  setTotalIncomePerHour: (income: number) => void;
}

const cardsData = [
  { id: 1, name: "Card 1", incomePerHour: 5000, cost: 1000 },
  { id: 2, name: "Card 2", incomePerHour: 15000, cost: 5000 },
  { id: 3, name: "Card 3", incomePerHour: 30000, cost: 20000 },
  { id: 4, name: "Card 4", incomePerHour: 10000, cost: 50000 },
  { id: 5, name: "Card 5", incomePerHour: 1000000, cost: 100000 },
];

const CardsPage: React.FC<CardsPageProps> = ({ money, setMoney, totalIncomePerHour, setTotalIncomePerHour }) => {

  const handleBuyCard = (cardId: number, cost: number, incomePerHour: number) => {
    if (money >= cost) {
      const newMoney = money - cost;
      setMoney(newMoney);
      setTotalIncomePerHour(incomePerHour);
    } else {
      alert("Not enough money to buy this card.");
    }
  };

  return (
    <div className="cards-container">
      {cardsData.map((card) => (
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
      ))}
    </div>
  );
};

export default CardsPage;
