import React from 'react';
import './DeckCard.css';

function DeckCard({ deck, onSelect, onDelete }) {
  const newCards = deck.cards?.filter(c => !c.lastReview).length || 0;
  const learningCards = deck.cards?.filter(c => c.interval < 21).length || 0;
  const reviewCards = deck.cards?.filter(c => c.interval >= 21).length || 0;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${deck.name}"?`)) {
      onDelete();
    }
  };

  return (
    <div className="deck-card" onClick={onSelect}>
      <div className="deck-card-header">
        <h3>{deck.name}</h3>
        <button
          className="btn-delete"
          onClick={handleDelete}
          title="Delete deck"
        >
          🗑️
        </button>
      </div>

      <div className="deck-stats">
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">{deck.cards?.length || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">New</span>
          <span className="stat-value stat-new">{newCards}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Learning</span>
          <span className="stat-value stat-learning">{learningCards}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Review</span>
          <span className="stat-value stat-review">{reviewCards}</span>
        </div>
      </div>

      <button className="btn-study">
        Study Now →
      </button>
    </div>
  );
}

export default DeckCard;
