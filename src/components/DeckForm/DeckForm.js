import React, { useState } from 'react';
import './DeckForm.css';

function DeckForm({ onCreateDeck, onCancel }) {
  const [deckName, setDeckName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckName.trim()) {
      onCreateDeck(deckName.trim());
      setDeckName('');
    }
  };

  return (
    <form className="deck-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter deck name..."
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className="deck-form-input"
        autoFocus
      />
      <div className="deck-form-buttons">
        <button type="submit" className="btn-submit">
          Create
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
