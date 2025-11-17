import React, { useState, useEffect } from 'react';
import './CardForm.css';

function CardForm({ onAddCard, onCancel, initialCard, onEditCard }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    if (initialCard) {
      setFront(initialCard.front);
      setBack(initialCard.back);
    }
  }, [initialCard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      if (initialCard && onEditCard) {
        onEditCard({ front: front.trim(), back: back.trim() });
      } else {
        onAddCard({ front: front.trim(), back: back.trim() });
      }
      setFront('');
      setBack('');
    }
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front (Question/Word)</label>
        <textarea
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Enter the question or word..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="back">Back (Answer/Definition)</label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Enter the answer or definition..."
          rows="3"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {initialCard ? 'Update Card' : 'Add Card'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CardForm;
