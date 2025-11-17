import React, { useState, useEffect } from 'react';
import './CardForm.css';

function CardForm({ onAddCard, onCancel, initialCard, onEditCard }) {
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [example, setExample] = useState('');
  const [level, setLevel] = useState('A1');
  const [topic, setTopic] = useState('general');
  const [image, setImage] = useState('');

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const topics = [
    'general', 'work', 'education', 'business', 'technology', 'nature',
    'emotions', 'character', 'life', 'daily', 'communication',
    'lifestyle', 'economics', 'environment', 'travel', 'health'
  ];

  useEffect(() => {
    if (initialCard) {
      setEnglish(initialCard.english || initialCard.front || '');
      setVietnamese(initialCard.vietnamese || initialCard.back || '');
      setExample(initialCard.example || '');
      setLevel(initialCard.level || 'A1');
      setTopic(initialCard.topic || 'general');
      setImage(initialCard.image || '');
    }
  }, [initialCard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (english.trim() && vietnamese.trim()) {
      const cardData = {
        english: english.trim(),
        vietnamese: vietnamese.trim(),
        example: example.trim() || `${english.trim()} in a sentence.`,
        level,
        topic,
        image: image.trim() || `https://picsum.photos/seed/${english.toLowerCase().replace(/\s+/g, '-')}/300/200.jpg`
      };

      if (initialCard && onEditCard) {
        onEditCard(cardData);
      } else {
        onAddCard(cardData);
      }

      // Reset form
      setEnglish('');
      setVietnamese('');
      setExample('');
      setLevel('A1');
      setTopic('general');
      setImage('');
    }
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="english">English Word *</label>
          <input
            id="english"
            type="text"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="Enter English word..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vietnamese">Vietnamese Meaning *</label>
          <input
            id="vietnamese"
            type="text"
            value={vietnamese}
            onChange={(e) => setVietnamese(e.target.value)}
            placeholder="Nhập nghĩa tiếng Việt..."
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="example">Example Sentence</label>
        <textarea
          id="example"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          placeholder="Enter an example sentence using this word..."
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="level">Level</label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {levels.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL (optional)</label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg (leave empty for auto-generated)"
        />
        {image && (
          <div className="image-preview">
            <img 
              src={image} 
              alt="Preview" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
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