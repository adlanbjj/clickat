import React from 'react';

interface CardsPageProps {
  money: number;
  setMoney: (money: number) => void;
  totalIncomePerHour: number;
  setTotalIncomePerHour: (income: number) => void;
}

const cardsData = [
  { id: 1, name: "Card 1", incomePerHour: 10, cost: 100 },
  { id: 2, name: "Card 2", incomePerHour: 20, cost: 200 },
  { id: 3, name: "Card 3", incomePerHour: 30, cost: 300 },
  { id: 4, name: "Card 4", incomePerHour: 40, cost: 400 },
  { id: 5, name: "Card 5", incomePerHour: 50, cost: 500 },
];

const CardsPage: React.FC<CardsPageProps> = ({ money, setMoney, totalIncomePerHour, setTotalIncomePerHour }) => {

  const handleBuyCard = (cardId: number, cost: number, incomePerHour: number) => {
    if (money >= cost) {
      setMoney(money - cost);
      setTotalIncomePerHour(totalIncomePerHour + incomePerHour);
    } else {
      alert("Not enough money to buy this card.");
    }
  };

  return (
    <div className="cards-container">
      {cardsData.map((card) => (
        <div key={card.id} className="card">
          <h3>{card.name}</h3>
          <p>Income per Hour: {card.incomePerHour}</p>
          <p>Cost: {card.cost}</p>
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
