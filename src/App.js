import React, { useState, useEffect } from 'react';
import './App.css';
import DeckList from './components/DeckList/DeckList';
import StudyView from './components/StudyView/StudyView';
import DeckForm from './components/DeckForm/DeckForm';
import Header from './components/Header/Header';
import { sampleVocabulary } from './data/sampleVocabulary';

function App() {
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [showDeckForm, setShowDeckForm] = useState(false);

  // Load decks from localStorage
  useEffect(() => {
    const savedDecks = localStorage.getItem('decks');
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks));
    } else {
      // Create a default deck with sample vocabulary on first load
      createDefaultDeck();
    }
  }, []);

  // Save decks to localStorage
  useEffect(() => {
    if (decks.length > 0) {
      localStorage.setItem('decks', JSON.stringify(decks));
    }
  }, [decks]);

  const createDefaultDeck = () => {
    const defaultDeck = {
      id: Date.now(),
      name: 'English Vocabulary',
      cards: sampleVocabulary.map(word => ({
        ...word,
        id: Date.now() + Math.random(),
        front: word.english,
        back: `${word.vietnamese}\n\nExample: ${word.example}`,
        interval: 1,
        ease: 2.5,
        reviews: 0,
        lapses: 0,
        nextReview: new Date(),
        lastReview: null
      })),
      createdAt: new Date(),
      stats: {
        new: sampleVocabulary.length,
        learning: 0,
        review: 0
      }
    };
    setDecks([defaultDeck]);
  };

  const handleCreateDeck = (deckName) => {
    const newDeck = {
      id: Date.now(),
      name: deckName,
      cards: [],
      createdAt: new Date(),
      stats: {
        new: 0,
        learning: 0,
        review: 0
      }
    };
    setDecks([...decks, newDeck]);
    setShowDeckForm(false);
  };

  const handleDeleteDeck = (deckId) => {
    setDecks(decks.filter(deck => deck.id !== deckId));
    if (currentDeck?.id === deckId) {
      setCurrentDeck(null);
    }
  };

  const handleSelectDeck = (deck) => {
    setCurrentDeck(deck);
  };

  const handleAddCard = (card) => {
    if (currentDeck) {
      const updatedDecks = decks.map(deck => {
        if (deck.id === currentDeck.id) {
          const newCard = {
            ...card,
            id: Date.now(),
            front: card.english,
            back: `${card.vietnamese}\n\nExample: ${card.example}`,
            interval: 1,
            ease: 2.5,
            reviews: 0,
            lapses: 0,
            nextReview: new Date(),
            lastReview: null
          };
          return { ...deck, cards: [...deck.cards, newCard] };
        }
        return deck;
      });
      setDecks(updatedDecks);
      setCurrentDeck(updatedDecks.find(d => d.id === currentDeck.id));
    }
  };

  const handleUpdateCard = (cardId, answer) => {
    if (currentDeck) {
      const updatedDecks = decks.map(deck => {
        if (deck.id === currentDeck.id) {
          const updatedCards = deck.cards.map(card => {
            if (card.id === cardId) {
              return updateCardStats(card, answer);
            }
            return card;
          });
          return { ...deck, cards: updatedCards };
        }
        return deck;
      });
      setDecks(updatedDecks);
      setCurrentDeck(updatedDecks.find(d => d.id === currentDeck.id));
    }
  };

  const updateCardStats = (card, answer) => {
    const now = new Date();
    let interval = card.interval || 1;
    let ease = card.ease || 2.5;
    let reviews = (card.reviews || 0) + 1;
    let lapses = card.lapses || 0;

    if (answer === 'again') {
      ease = Math.max(1.3, ease - 0.2);
      lapses += 1;
      interval = 1;
    } else if (answer === 'hard') {
      ease = Math.max(1.3, ease - 0.15);
      interval = Math.max(1, interval * 1.2);
    } else if (answer === 'good') {
      interval = Math.round(interval * ease);
    } else if (answer === 'easy') {
      ease += 0.1;
      interval = Math.round(interval * (ease + 1));
    }

    return {
      ...card,
      interval,
      ease,
      reviews,
      lapses,
      lastReview: now,
      nextReview: new Date(now.getTime() + interval * 24 * 60 * 60 * 1000)
    };
  };

  const handleDeleteCard = (cardId) => {
    if (currentDeck) {
      const updatedDecks = decks.map(deck => {
        if (deck.id === currentDeck.id) {
          return { ...deck, cards: deck.cards.filter(c => c.id !== cardId) };
        }
        return deck;
      });
      setDecks(updatedDecks);
      setCurrentDeck(updatedDecks.find(d => d.id === currentDeck.id));
    }
  };

  const handleEditCard = (cardId, updatedCard) => {
    if (currentDeck) {
      const updatedDecks = decks.map(deck => {
        if (deck.id === currentDeck.id) {
          return {
            ...deck,
            cards: deck.cards.map(c => (c.id === cardId ? { 
              ...c, 
              ...updatedCard,
              front: updatedCard.english,
              back: `${updatedCard.vietnamese}\n\nExample: ${updatedCard.example}`
            } : c))
          };
        }
        return deck;
      });
      setDecks(updatedDecks);
      setCurrentDeck(updatedDecks.find(d => d.id === currentDeck.id));
    }
  };

  const handleBackToDeckList = () => {
    setCurrentDeck(null);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        {!currentDeck ? (
          <DeckList
            decks={decks}
            onSelectDeck={handleSelectDeck}
            onDeleteDeck={handleDeleteDeck}
            onCreateDeck={handleCreateDeck}
            showDeckForm={showDeckForm}
            onShowDeckForm={setShowDeckForm}
          />
        ) : (
          <StudyView
            deck={currentDeck}
            onAddCard={handleAddCard}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
            onEditCard={handleEditCard}
            onBack={handleBackToDeckList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
