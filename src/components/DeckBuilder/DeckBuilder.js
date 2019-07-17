import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import './DeckBuilder.scss';
import { saveDeck } from '../../reducers/decks';
import DeckList from '../DeckList/DeckList';

function DecksList({ decks, match, saveDeck }) {
  const [deckName, setDeckName] = useState('');
  const [deckFormat, setDeckFormat] = useState({ id: 1, name: 'Standard' });

  const handleSaveDeck = () => {
    saveDeck({ deckId: Date.now(), deckName, deckFormat, deckList: [] });
    setDeckName('');
    setDeckFormat({ id: 1, name: 'Standard' });
  };
  return (
    <div className="flex">
      <div className="decks">
        {decks.length ? (
          <div className="decks-list">
            <h1>Decks</h1>
            <ul>
              {decks.map(({ deckId, deckName, deckFormat }) => {
                return (
                  <li key={deckId}>
                    <Link to={`${match.url}/${deckId}`}>
                      {deckName || 'Unnamed deck'}
                    </Link>{' '}
                    - {deckFormat.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        <div className="add-deck-form">
          <h2>Add a new deck</h2>
          <div className="form-control">
            <label htmlFor="deck-name">Deck name: </label>
            <input
              id="deck-name"
              type="text"
              value={deckName}
              onChange={({ target }) => setDeckName(target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="deck-format">Deck Format: </label>
            <select
              id="deck-format"
              value={deckFormat.id}
              onChange={({ target }) => {
                setDeckFormat({
                  id: target.value,
                  name: target.selectedOptions[0].innerText,
                });
              }}
            >
              <option value="1">Standard</option>
              <option value="2">Modern</option>
              <option value="3">Legacy</option>
              <option value="4">Commander/EDH</option>
            </select>
          </div>
          <button onClick={handleSaveDeck}>Save</button>
        </div>
      </div>
      <div className="deck">
        <Route path={`${match.path}/:deckId`} component={DeckList} />
      </div>
    </div>
  );
}

export default connect(
  ({ decks }) => ({ decks }),
  { saveDeck },
)(DecksList);
