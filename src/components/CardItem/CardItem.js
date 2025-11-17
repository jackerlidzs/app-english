import React, { useState } from 'react';
import './CardItem.css';

function CardItem({ card, onDelete, onEdit }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const speakWord = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.english || card.front);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'A1': return 'bg-green-100 text-green-800 border-green-200';
      case 'A2': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B1': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'B2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'C1': return 'bg-red-100 text-red-800 border-red-200';
      case 'C2': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTopicColor = (topic) => {
    const colors = {
      work: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      education: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      business: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      technology: 'bg-violet-100 text-violet-800 border-violet-200',
      nature: 'bg-lime-100 text-lime-800 border-lime-200',
      emotions: 'bg-pink-100 text-pink-800 border-pink-200',
      character: 'bg-amber-100 text-amber-800 border-amber-200',
      life: 'bg-teal-100 text-teal-800 border-teal-200',
      daily: 'bg-slate-100 text-slate-800 border-slate-200',
      communication: 'bg-rose-100 text-rose-800 border-rose-200',
      lifestyle: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      economics: 'bg-sky-100 text-sky-800 border-sky-200',
      environment: 'bg-green-100 text-green-800 border-green-200',
      travel: 'bg-orange-100 text-orange-800 border-orange-200',
      health: 'bg-red-100 text-red-800 border-red-200',
      general: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[topic] || colors.general;
  };

  const getCardStatus = () => {
    const now = new Date();
    if (!card.lastReview) return { text: 'New', color: 'bg-blue-100 text-blue-800' };
    if (card.nextReview > now) return { text: 'Learning', color: 'bg-yellow-100 text-yellow-800' };
    if (card.interval >= 21) return { text: 'Review', color: 'bg-green-100 text-green-800' };
    return { text: 'Learning', color: 'bg-yellow-100 text-yellow-800' };
  };

  const status = getCardStatus();

  return (
    <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
      <div className="card-item-content">
        <div className={`card-item-text ${isFlipped ? 'back' : 'front'}`}>
          {/* Front side */}
          {!isFlipped && (
            <div className="card-front-content">
              <div className="card-header">
                <h3 className="card-word">{card.english || card.front}</h3>
                <button
                  className="speak-btn"
                  onClick={speakWord}
                  title="Pronounce word"
                >
                  🔊
                </button>
              </div>
              <div className="card-tags">
                <span className={`tag ${getLevelColor(card.level)}`}>
                  {card.level || 'A1'}
                </span>
                <span className={`tag ${getTopicColor(card.topic)}`}>
                  {card.topic || 'general'}
                </span>
              </div>
              {card.image && !imageError && (
                <div className="card-image">
                  <img
                    src={card.image}
                    alt={card.english || card.front}
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Back side */}
          {isFlipped && (
            <div className="card-back-content">
              <div className="card-header">
                <h3 className="card-word">{card.english || card.front}</h3>
                <button
                  className="speak-btn"
                  onClick={speakWord}
                  title="Pronounce word"
                >
                  🔊
                </button>
              </div>
              <div className="card-meaning">
                <strong>Meaning:</strong> {card.vietnamese || card.back}
              </div>
              {card.example && (
                <div className="card-example">
                  <strong>Example:</strong> {card.example}
                </div>
              )}
              <div className="card-tags">
                <span className={`tag ${getLevelColor(card.level)}`}>
                  {card.level || 'A1'}
                </span>
                <span className={`tag ${getTopicColor(card.topic)}`}>
                  {card.topic || 'general'}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="card-item-label">
          {isFlipped ? 'Click to flip back' : 'Click to see meaning'}
        </div>
      </div>

      <div className="card-item-info">
        <div className="card-stats">
          <span className={`info-badge ${status.color}`}>
            {status.text}
          </span>
          <span className="info-badge">
            Reviewed: {card.reviews || 0}
          </span>
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