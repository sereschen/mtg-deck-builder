import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mtg from 'mtgsdk';
import { map, isEmpty } from 'lodash';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import { addCardToDeck } from '../../reducers/decks';
function CardDetails({ match, addCardToDeck, decks }) {
  const [card, setCard] = useState({});
  const [amount, setAmount] = useState(1);
  const [selectedDeck, setSelectedDeck] = useState('');
  useEffect(() => {
    mtg.card.find(match.params.id).then(resCard => setCard(resCard.card));
  }, [match.params.id]);

  const { name, imageUrl, setName } = card;

  return !isEmpty(card) ? (
    <div className="card-details">
      <h1>{name}</h1>
      <h2>{setName}</h2>
      <div>
        <label htmlFor="">Decks: </label>
        <select
          value={selectedDeck}
          onChange={({ target }) => {
            setSelectedDeck(target.value);
          }}
        >
          <option value="">Select a deck</option>
          {decks.map(({ deckId, deckName }) => {
            return (
              <option key={deckId} value={deckId}>
                {deckName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount: </label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (selectedDeck) {
            addCardToDeck(card, { deckId: selectedDeck }, amount);
          }
        }}
      >
        Add to deck
      </button>
      <div className="card-info-body">
        <ul className="card-info">
          {map(card, (value, key) => {
            return value && typeof value === 'string' ? (
              <li key={key}>
                <strong>{key}</strong> {value}
              </li>
            ) : null;
          })}
        </ul>
        {imageUrl ? <Card {...card} /> : null}
      </div>
    </div>
  ) : (
    <Spinner isLoading={!isEmpty(card)} />
  );
}
export default connect(
  ({ decks }) => ({ decks }),
  { addCardToDeck },
)(CardDetails);
