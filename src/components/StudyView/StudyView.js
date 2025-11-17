import React, { useState, useEffect } from 'react';
import './StudyView.css';
import CardForm from '../CardForm/CardForm';
import CardList from '../CardList/CardList';
import StudySession from '../StudySession/StudySession';
import { sampleVocabulary } from '../../data/sampleVocabulary';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [studyMode, setStudyMode] = useState('review'); // 'review' or 'learn'
  const [showStats, setShowStats] = useState(false);

  const cardsToStudy = deck.cards.filter(card => {
    const now = new Date();
    if (studyMode === 'review') {
      return card.nextReview <= now;
    } else {
      return true; // Learn mode shows all cards
    }
  });

  const getFilteredCards = () => {
    let filtered = deck.cards;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.example.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    switch (cardFilter) {
      case 'new':
        filtered = filtered.filter(c => !c.lastReview);
        break;
      case 'learning':
        filtered = filtered.filter(c => c.interval < 21 && c.lastReview);
        break;
      case 'review':
        filtered = filtered.filter(c => c.interval >= 21);
        break;
      case 'due':
        const now = new Date();
        filtered = filtered.filter(c => c.nextReview <= now);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const getCardStats = () => {
    const now = new Date();
    const stats = {
      total: deck.cards.length,
      new: deck.cards.filter(c => !c.lastReview).length,
      learning: deck.cards.filter(c => c.interval < 21 && c.lastReview).length,
      review: deck.cards.filter(c => c.interval >= 21).length,
      due: deck.cards.filter(c => c.nextReview <= now).length,
      mastered: deck.cards.filter(c => c.interval >= 100).length,
    };
    
    // Calculate level distribution
    const levelCounts = {};
    deck.cards.forEach(card => {
      const level = card.level || 'A1';
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    
    // Calculate topic distribution
    const topicCounts = {};
    deck.cards.forEach(card => {
      const topic = card.topic || 'general';
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
    
    return { ...stats, levelCounts, topicCounts };
  };

  const handleAddCard = (card) => {
    onAddCard(card);
    setShowCardForm(false);
  };

  const handleEditCard = (card) => {
    onEditCard(editingCard.id, card);
    setEditingCard(null);
  };

  const handleLoadSampleData = () => {
    sampleVocabulary.forEach(word => {
      const cardData = {
        english: word.english,
        vietnamese: word.vietnamese,
        example: word.example,
        level: word.level,
        topic: word.topic,
        image: word.image
      };
      onAddCard(cardData);
    });
  };

  const filteredCards = getFilteredCards();
  const stats = getCardStats();

  return (
    <div className="study-view">
      <div className="study-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Decks
        </button>
        <div className="header-content">
          <h2>{deck.name}</h2>
          <div className="study-stats">
            <div className="stat-item">
              <span className="stat-label">New</span>
              <span className="stat-badge new-badge">{stats.new}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Learning</span>
              <span className="stat-badge learning-badge">{stats.learning}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Review</span>
              <span className="stat-badge review-badge">{stats.review}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Due</span>
              <span className="stat-badge due-badge">{stats.due}</span>
            </div>
          </div>
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
          <div className="study-controls">
            <div className="control-section">
              <div className="mode-selector">
                <button
                  className={`mode-btn ${studyMode === 'review' ? 'active' : ''}`}
                  onClick={() => setStudyMode('review')}
                >
                  📚 Review Mode
                </button>
                <button
                  className={`mode-btn ${studyMode === 'learn' ? 'active' : ''}`}
                  onClick={() => setStudyMode('learn')}
                >
                  🎓 Learn Mode
                </button>
              </div>
              
              <div className="action-buttons">
                {cardsToStudy.length > 0 && (
                  <button
                    className="btn-start-study"
                    onClick={() => setIsStudying(true)}
                  >
                    ▶ Start {studyMode === 'review' ? 'Review' : 'Learning'} Session ({cardsToStudy.length} cards)
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
                <button
                  className="btn-stats"
                  onClick={() => setShowStats(!showStats)}
                >
                  📊 {showStats ? 'Hide' : 'Show'} Stats
                </button>
                {deck.cards.length === 0 && (
                  <button
                    className="btn-load-samples"
                    onClick={handleLoadSampleData}
                  >
                    📥 Load Sample Vocabulary
                  </button>
                )}
              </div>
            </div>

            <div className="search-section">
              <input
                type="text"
                placeholder="Search vocabulary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <button
                className={`filter-btn ${cardFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCardFilter('all')}
              >
                All ({stats.total})
              </button>
              <button
                className={`filter-btn ${cardFilter === 'new' ? 'active' : ''}`}
                onClick={() => setCardFilter('new')}
              >
                New ({stats.new})
              </button>
              <button
                className={`filter-btn ${cardFilter === 'learning' ? 'active' : ''}`}
                onClick={() => setCardFilter('learning')}
              >
                Learning ({stats.learning})
              </button>
              <button
                className={`filter-btn ${cardFilter === 'review' ? 'active' : ''}`}
                onClick={() => setCardFilter('review')}
              >
                Review ({stats.review})
              </button>
              <button
                className={`filter-btn ${cardFilter === 'due' ? 'active' : ''}`}
                onClick={() => setCardFilter('due')}
              >
                Due ({stats.due})
              </button>
            </div>
          </div>

          {showStats && (
            <div className="stats-panel">
              <h3>📊 Deck Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Progress Overview</h4>
                  <div className="progress-stats">
                    <div className="progress-item">
                      <span>Mastered:</span>
                      <span>{stats.mastered} ({Math.round((stats.mastered / stats.total) * 100)}%)</span>
                    </div>
                    <div className="progress-item">
                      <span>Learning:</span>
                      <span>{stats.learning} ({Math.round((stats.learning / stats.total) * 100)}%)</span>
                    </div>
                    <div className="progress-item">
                      <span>New:</span>
                      <span>{stats.new} ({Math.round((stats.new / stats.total) * 100)}%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <h4>Level Distribution</h4>
                  <div className="level-stats">
                    {Object.entries(stats.levelCounts).map(([level, count]) => (
                      <div key={level} className="level-item">
                        <span className="level-badge">{level}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="stat-card">
                  <h4>Topic Distribution</h4>
                  <div className="topic-stats">
                    {Object.entries(stats.topicCounts).map(([topic, count]) => (
                      <div key={topic} className="topic-item">
                        <span className="topic-badge">{topic}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCardForm && (
            <CardForm
              onAddCard={handleAddCard}
              onCancel={() => setShowCardForm(false)}
              initialCard={editingCard}
              onEditCard={editingCard ? handleEditCard : null}
            />
          )}

          {filteredCards.length === 0 ? (
            <div className="empty-cards">
              <div className="empty-icon">📚</div>
              <h3>No cards found</h3>
              <p>
                {searchTerm 
                  ? 'No cards match your search. Try a different search term.'
                  : cardFilter !== 'all' 
                    ? 'No cards in this filter. Try selecting a different filter or add some new cards.'
                    : 'No cards in this deck yet. Add some cards to get started!'
                }
              </p>
              {!searchTerm && cardFilter === 'all' && (
                <button
                  className="btn-add-card primary"
                  onClick={() => setShowCardForm(true)}
                >
                  + Add Your First Card
                </button>
              )}
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