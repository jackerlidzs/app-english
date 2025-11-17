import React from 'react';
import './StudyCard.css';

function StudyCard({ card, isFlipped, onFlip }) {
  return (
    <div className="study-card-container">
      <div
        className={`study-card ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
      >
        <div className="study-card-inner">
          <div className="study-card-front">
            <div className="card-label">Front</div>
            <div className="card-content">
              {card.front}
            </div>
            <div className="card-hint">Click to reveal answer</div>
          </div>
          <div className="study-card-back">
            <div className="card-label">Back</div>
            <div className="card-content">
              {card.back}
            </div>
            <div className="card-hint">Click to flip again</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
