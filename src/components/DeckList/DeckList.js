import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { removeCardFromDeck, deleteDeck } from '../../reducers/decks';

function DeckList({ match, removeCardFromDeck, decks, deleteDeck, history }) {
  const [deck, setDeck] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { params } = match;
  useEffect(() => {
    const foudnDeck = decks.find(item => item.deckId === Number(params.deckId));
    if (!foudnDeck) {
      setNotFound(true);
    } else {
      setDeck(foudnDeck);
    }
  }, [params.deckId, deck, decks]);

  return deck ? (
    <Fragment>
      <h2>{deck.deckName || 'Unnamed deck'}</h2>
      <h3>
        <button
          className="icon-button"
          onClick={() => {
            deleteDeck(deck);
            history.goBack();
          }}
        >
          <span>Delete deck </span>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </h3>
      <ul>
        {deck.deckList.map((card, index) => {
          return (
            <li key={card.id + index}>
              <span>
                {card.name} x {card.amount || 1}
              </span>
              <button
                className="icon-button"
                onClick={() => {
                  removeCardFromDeck(card.id, deck.deckId);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </li>
          );
        })}
      </ul>
    </Fragment>
  ) : !notFound ? (
    <Spinner />
  ) : (
    <img src={'./not-found.jpg'} alt="not found" />
  );
}

export default connect(
  ({ decks }) => ({ decks }),
  { removeCardFromDeck, deleteDeck },
)(DeckList);
