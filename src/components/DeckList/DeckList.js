import React from 'react';
import './DeckList.css';
import DeckForm from '../DeckForm/DeckForm';
import DeckCard from '../DeckCard/DeckCard';

function DeckList({
  decks,
  onSelectDeck,
  onDeleteDeck,
  onCreateDeck,
  showDeckForm,
  onShowDeckForm
}) {
  return (
    <div className="deck-list">
      <div className="deck-list-header">
        <h2>My Decks</h2>
        <button
          className="btn-create-deck"
          onClick={() => onShowDeckForm(!showDeckForm)}
        >
          {showDeckForm ? '✕ Cancel' : '+ New Deck'}
        </button>
      </div>

      {showDeckForm && (
        <DeckForm
          onCreateDeck={onCreateDeck}
          onCancel={() => onShowDeckForm(false)}
        />
      )}

      {decks.length === 0 ? (
        <div className="empty-state">
          <p>No decks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="decks-grid">
          {decks.map(deck => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onSelect={() => onSelectDeck(deck)}
              onDelete={() => onDeleteDeck(deck.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DeckList;
