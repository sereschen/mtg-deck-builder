const SAVE_DECK = 'SAVE_DECK';
const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
const REMOVE_CARD_FROM_DECK = 'REMOVE_CARD_FROM_DECK';
const DELETE_DECK = 'DELETE_DECK';

export const saveDeck = deck => ({
  type: SAVE_DECK,
  deck,
});

export const deleteDeck = deck => ({
  type: DELETE_DECK,
  deck,
});

export const addCardToDeck = (card, deck, amount) => ({
  type: ADD_CARD_TO_DECK,
  card,
  deck,
  amount,
});

export const removeCardFromDeck = (card, deck) => ({
  type: REMOVE_CARD_FROM_DECK,
  card,
  deck,
});

const newDeckFormat = {
  deckId: Date.now(),
  deckName: '',
  deckFormat: {},
  deckList: [],
};

export const getDeck = (decks, deck) => {
  return decks.find(item => item.deckId === Number(deck.deckId));
};

const decks = (state = [], action) => {
  switch (action.type) {
    case SAVE_DECK: {
      const { deck } = action;
      const storedDeck = getDeck(state, deck);
      if (!storedDeck) {
        return [...state, deck];
      } else {
        return state.map(item => (item.deckId !== deck.deckId ? item : deck));
      }
    }

    case DELETE_DECK: {
      const { deck } = action;
      return state.filter(item => item.deckId !== deck.deckId);
    }

    case ADD_CARD_TO_DECK: {
      const { card, deck, amount } = action;
      const storedDeck = getDeck(state, deck);
      if (storedDeck) {
        const newDeck = {
          ...storedDeck,
          deckList: [...storedDeck.deckList, { ...card, amount: amount || 1 }],
        };
        return state.map(item =>
          item.deckId !== Number(deck.deckId) ? item : newDeck,
        );
      }
      return state;
    }

    case REMOVE_CARD_FROM_DECK: {
      const { card, deck } = action;
      const storedDeck = getDeck(state, deck);
      const newDeck = {
        ...storedDeck,
        deckList: storedDeck.deckList.filter(
          item => item.cardId !== card.cardId,
        ),
      };

      if (!storedDeck) {
        return [...state, deck];
      } else {
        return state.map(item =>
          item.deckId !== deck.deckId ? item : newDeck,
        );
      }
    }

    default: {
      return state;
    }
  }
};

export default decks;
