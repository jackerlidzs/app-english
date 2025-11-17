import React, { useState } from 'react';
import './CardItem.css';

function CardItem({ card, onDelete, onEdit }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete();
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
      <div className="card-item-content">
        <div className={`card-item-text ${isFlipped ? 'back' : 'front'}`}>
          {isFlipped ? card.back : card.front}
        </div>
        <div className="card-item-label">
          {isFlipped ? 'Back - Click to flip' : 'Front - Click to flip'}
        </div>
      </div>

      <div className="card-item-info">
        <div className="card-stats">
          <span className="info-badge">Reviewed: {card.reviews}</span>
          {card.lastReview && (
            <span className="info-badge">
              Next: {new Date(card.nextReview).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="card-item-actions">
          <button
            className="btn-edit"
            onClick={handleEdit}
            title="Edit card"
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            title="Delete card"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
