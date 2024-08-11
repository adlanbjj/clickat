import React from 'react';

interface EarningsModalProps {
  offlineEarnings: number;
  collectEarnings: () => void;
}

const EarningsModal: React.FC<EarningsModalProps> = ({ offlineEarnings, collectEarnings }) => {
  return (
    <div className="earnings-modal">
      <div className="earnings-modal-content">
        <h2>You have earned {offlineEarnings.toFixed(2)} coins while you were away!</h2>
        <button onClick={collectEarnings}>Collect</button>
      </div>
    </div>
  );
}

export default EarningsModal;
