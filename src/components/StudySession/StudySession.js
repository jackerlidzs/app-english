import React, { useState, useEffect } from 'react';
import './StudySession.css';
import StudyCard from '../StudyCard/StudyCard';

function StudySession({ cards, deck, onUpdateCard, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const handleAnswer = (answer) => {
    onUpdateCard(currentCard.id, answer);
    setSessionStats(prev => ({
      ...prev,
      [answer]: prev[answer] + 1
    }));

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    onFinish();
  };

  const handleSkipCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      finishSession();
    }
  };

  return (
    <div className="study-session">
      <div className="session-header">
        <div className="session-progress">
          <span className="progress-text">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="session-stats-display">
          <div className="stat-item">
            <span className="stat-label">Again</span>
            <span className="stat-count again">{sessionStats.again}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Hard</span>
            <span className="stat-count hard">{sessionStats.hard}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Good</span>
            <span className="stat-count good">{sessionStats.good}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Easy</span>
            <span className="stat-count easy">{sessionStats.easy}</span>
          </div>
        </div>
      </div>

      <StudyCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />

      <div className="session-actions">
        <button
          className="btn-answer again-btn"
          onClick={() => handleAnswer('again')}
          title="I got it wrong (keyboard: 1)"
        >
          Again
        </button>
        <button
          className="btn-answer hard-btn"
          onClick={() => handleAnswer('hard')}
          title="It was hard (keyboard: 2)"
        >
          Hard
        </button>
        <button
          className="btn-answer good-btn"
          onClick={() => handleAnswer('good')}
          title="It was good (keyboard: 3)"
        >
          Good
        </button>
        <button
          className="btn-answer easy-btn"
          onClick={() => handleAnswer('easy')}
          title="It was easy (keyboard: 4)"
        >
          Easy
        </button>
      </div>

      <div className="session-footer">
        <button className="btn-skip" onClick={handleSkipCard}>
          Skip Card
        </button>
        <button className="btn-exit" onClick={finishSession}>
          Exit Study Session
        </button>
      </div>
    </div>
  );
}

export default StudySession;
