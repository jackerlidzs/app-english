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

  const handleKeyPress = (e) => {
    if (!isFlipped) return;
    
    switch(e.key) {
      case '1':
        handleAnswer('again');
        break;
      case '2':
        handleAnswer('hard');
        break;
      case '3':
        handleAnswer('good');
        break;
      case '4':
        handleAnswer('easy');
        break;
      case ' ':
        e.preventDefault();
        setIsFlipped(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, currentIndex, currentCard]);

  const getAnswerButtonClass = (type) => {
    const baseClass = "btn-answer font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg";
    switch(type) {
      case 'again':
        return `${baseClass} bg-red-500 hover:bg-red-600 text-white`;
      case 'hard':
        return `${baseClass} bg-orange-500 hover:bg-orange-600 text-white`;
      case 'good':
        return `${baseClass} bg-blue-500 hover:bg-blue-600 text-white`;
      case 'easy':
        return `${baseClass} bg-green-500 hover:bg-green-600 text-white`;
      default:
        return baseClass;
    }
  };

  const getStatClass = (type) => {
    switch(type) {
      case 'again':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'hard':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="study-session">
      <div className="session-header">
        <div className="session-progress mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentIndex + 1) / cards.length) * 100)}% Complete
            </span>
          </div>
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
            <span className={`stat-count ${getStatClass('again')}`}>{sessionStats.again}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Hard</span>
            <span className={`stat-count ${getStatClass('hard')}`}>{sessionStats.hard}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Good</span>
            <span className={`stat-count ${getStatClass('good')}`}>{sessionStats.good}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Easy</span>
            <span className={`stat-count ${getStatClass('easy')}`}>{sessionStats.easy}</span>
          </div>
        </div>
      </div>

      <StudyCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />

      <div className="session-actions">
        {isFlipped ? (
          <>
            <button
              className={getAnswerButtonClass('again')}
              onClick={() => handleAnswer('again')}
              title="I got it wrong (keyboard: 1)"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">😔</span>
                <div className="text-left">
                  <div>Again</div>
                  <div className="text-xs opacity-75">0 days</div>
                </div>
              </span>
            </button>
            <button
              className={getAnswerButtonClass('hard')}
              onClick={() => handleAnswer('hard')}
              title="It was hard (keyboard: 2)"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">😰</span>
                <div className="text-left">
                  <div>Hard</div>
                  <div className="text-xs opacity-75">1 day</div>
                </div>
              </span>
            </button>
            <button
              className={getAnswerButtonClass('good')}
              onClick={() => handleAnswer('good')}
              title="It was good (keyboard: 3)"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">😊</span>
                <div className="text-left">
                  <div>Good</div>
                  <div className="text-xs opacity-75">3 days</div>
                </div>
              </span>
            </button>
            <button
              className={getAnswerButtonClass('easy')}
              onClick={() => handleAnswer('easy')}
              title="It was easy (keyboard: 4)"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">😎</span>
                <div className="text-left">
                  <div>Easy</div>
                  <div className="text-xs opacity-75">7 days</div>
                </div>
              </span>
            </button>
          </>
        ) : (
          <div className="flip-hint">
            <p className="text-gray-600 text-center">
              Click the card to reveal the answer
            </p>
          </div>
        )}
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