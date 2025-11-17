import React, { useState } from 'react';
import './StudyCard.css';

function StudyCard({ card, isFlipped, onFlip }) {
  const [imageError, setImageError] = useState(false);

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'A1': return 'bg-green-100 text-green-800';
      case 'A2': return 'bg-blue-100 text-blue-800';
      case 'B1': return 'bg-yellow-100 text-yellow-800';
      case 'B2': return 'bg-orange-100 text-orange-800';
      case 'C1': return 'bg-red-100 text-red-800';
      case 'C2': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTopicColor = (topic) => {
    const colors = {
      work: 'bg-indigo-100 text-indigo-800',
      education: 'bg-cyan-100 text-cyan-800',
      business: 'bg-emerald-100 text-emerald-800',
      technology: 'bg-violet-100 text-violet-800',
      nature: 'bg-lime-100 text-lime-800',
      emotions: 'bg-pink-100 text-pink-800',
      character: 'bg-amber-100 text-amber-800',
      life: 'bg-teal-100 text-teal-800',
      daily: 'bg-slate-100 text-slate-800',
      communication: 'bg-rose-100 text-rose-800',
      lifestyle: 'bg-fuchsia-100 text-fuchsia-800',
      economics: 'bg-sky-100 text-sky-800',
      environment: 'bg-green-100 text-green-800',
      travel: 'bg-orange-100 text-orange-800',
      health: 'bg-red-100 text-red-800'
    };
    return colors[topic] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="study-card-container">
      <div
        className={`study-card ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
      >
        <div className="study-card-inner">
          {/* Front of card - English word */}
          <div className="study-card-front">
            <div className="card-top-section">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(card.level)}`}>
                  {card.level}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord();
                  }}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200 shadow-md"
                  title="Pronounce word"
                >
                  🔊
                </button>
              </div>
              
              <div className="word-display">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {card.english}
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTopicColor(card.topic)}`}>
                    {card.topic}
                  </span>
                </div>
              </div>
            </div>
            
            {card.image && !imageError && (
              <div className="card-image-container">
                <img
                  src={card.image}
                  alt={card.english}
                  className="card-image"
                  onError={() => setImageError(true)}
                />
              </div>
            )}
            
            <div className="card-hint text-center text-gray-500 text-sm mt-4">
              Click to reveal meaning and example
            </div>
          </div>

          {/* Back of card - Vietnamese meaning and example */}
          <div className="study-card-back">
            <div className="card-top-section">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(card.level)}`}>
                  {card.level}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord();
                  }}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200 shadow-md"
                  title="Pronounce word"
                >
                  🔊
                </button>
              </div>
              
              <div className="word-display">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {card.english}
                </h2>
                <div className="text-xl text-indigo-600 font-medium mb-3">
                  {card.vietnamese}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTopicColor(card.topic)}`}>
                    {card.topic}
                  </span>
                </div>
              </div>
            </div>

            <div className="example-section">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Example:</h3>
              <p className="text-gray-700 italic bg-gray-50 p-3 rounded-lg">
                "{card.example}"
              </p>
            </div>
            
            <div className="card-hint text-center text-gray-500 text-sm mt-4">
              Click to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;