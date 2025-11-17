import React, { useState } from 'react';
import './StudyView.css';
import CardForm from '../CardForm/CardForm';
import CardList from '../CardList/CardList';
import StudySession from '../StudySession/StudySession';

function StudyView({
  deck,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onEditCard,
  onBack
}) {
  const [showCardForm, setShowCardForm] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cardFilter, setCardFilter] = useState('all');

  const cardsToStudy = deck.cards.filter(card => {
    const now = new Date();
    return card.nextReview <= now;
  });

  const getFilteredCards = () => {
    switch (cardFilter) {
      case 'new':
        return deck.cards.filter(c => !c.lastReview);
      case 'learning':
        return deck.cards.filter(c => c.interval < 21 && c.lastReview);
      case 'review':
        return deck.cards.filter(c => c.interval >= 21);
      default:
        return deck.cards;
    }
  };

  const handleAddCard = (card) => {
    onAddCard(card);
    setShowCardForm(false);
  };

  const handleEditCard = (card) => {
    onEditCard(editingCard.id, card);
    setEditingCard(null);
  };

  const filteredCards = getFilteredCards();

  return (
    <div className="study-view">
      <div className="study-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Decks
        </button>
        <h2>{deck.name}</h2>
        <div className="study-stats">
          <span className="stat-badge new-badge">{deck.cards.filter(c => !c.lastReview).length}</span>
          <span className="stat-badge learning-badge">{deck.cards.filter(c => c.interval < 21 && c.lastReview).length}</span>
          <span className="stat-badge review-badge">{deck.cards.filter(c => c.interval >= 21).length}</span>
        </div>
      </div>

      {isStudying && cardsToStudy.length > 0 ? (
        <StudySession
          cards={cardsToStudy}
          deck={deck}
          onUpdateCard={onUpdateCard}
          onFinish={() => setIsStudying(false)}
        />
      ) : (
        <div className="study-content">
          <div className="study-actions">
            {cardsToStudy.length > 0 && (
              <button
                className="btn-start-study"
                onClick={() => setIsStudying(true)}
              >
                ▶ Start Study Session ({cardsToStudy.length} cards)
              </button>
            )}
            <button
              className="btn-add-card"
              onClick={() => {
                setShowCardForm(!showCardForm);
                setEditingCard(null);
              }}
            >
              {showCardForm ? '✕ Cancel' : '+ Add Card'}
            </button>
          </div>

          {showCardForm && (
            <CardForm
              onAddCard={handleAddCard}
              onCancel={() => setShowCardForm(false)}
              initialCard={editingCard}
              onEditCard={editingCard ? handleEditCard : null}
            />
          )}

          <div className="filter-section">
            <button
              className={`filter-btn ${cardFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCardFilter('all')}
            >
              All ({deck.cards.length})
            </button>
            <button
              className={`filter-btn ${cardFilter === 'new' ? 'active' : ''}`}
              onClick={() => setCardFilter('new')}
            >
              New ({deck.cards.filter(c => !c.lastReview).length})
            </button>
            <button
              className={`filter-btn ${cardFilter === 'learning' ? 'active' : ''}`}
              onClick={() => setCardFilter('learning')}
            >
              Learning ({deck.cards.filter(c => c.interval < 21 && c.lastReview).length})
            </button>
            <button
              className={`filter-btn ${cardFilter === 'review' ? 'active' : ''}`}
              onClick={() => setCardFilter('review')}
            >
              Review ({deck.cards.filter(c => c.interval >= 21).length})
            </button>
          </div>

          {filteredCards.length === 0 ? (
            <div className="empty-cards">
              <p>No cards in this filter. Add some cards to get started!</p>
            </div>
          ) : (
            <CardList
              cards={filteredCards}
              onDeleteCard={onDeleteCard}
              onEditCard={(card) => {
                setEditingCard(card);
                setShowCardForm(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default StudyView;
