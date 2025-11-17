import React from 'react';
import './CardList.css';
import CardItem from '../CardItem/CardItem';

function CardList({ cards, onDeleteCard, onEditCard }) {
  return (
    <div className="card-list">
      <h3 className="card-list-title">Flashcards ({cards.length})</h3>
      <div className="cards-container">
        {cards.map(card => (
          <CardItem
            key={card.id}
            card={card}
            onDelete={() => onDeleteCard(card.id)}
            onEdit={() => onEditCard(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
