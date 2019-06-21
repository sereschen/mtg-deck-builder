import React, { useEffect, useState } from 'react';
import mtg from 'mtgsdk';

export default function CardDetails({ match }) {
  const [card, setCard] = useState({});
  useEffect(() => {
    mtg.card.find(match.params.id).then(resCard => setCard(resCard.card));
  }, [match.params.id]);

  const {
    name,
    imageUrl,
    setName,
    manaCost,
    cmc,
    type,
    rarity,
    text,
    flavor,
    artist,
    number,
    power,
    toughness,
    reserved,
  } = card;

  return (
    <div className="card-details">
      <h1>{name}</h1>
      <h2>{setName}</h2>
      <div className="card-info-body">
        <ul className="card-info">
          {manaCost ? (
            <li>
              <strong>Mana Cost:</strong> {manaCost}
            </li>
          ) : null}
          {cmc ? (
            <li>
              <strong>Cmc:</strong> {cmc}
            </li>
          ) : null}
          {type ? (
            <li>
              <strong>Type:</strong> {type}
            </li>
          ) : null}
          {rarity ? (
            <li>
              <strong>Rarity:</strong> {rarity}
            </li>
          ) : null}
          {text ? (
            <li>
              <strong>Text:</strong> {text}
            </li>
          ) : null}
          {flavor ? (
            <li>
              <strong>Flavor:</strong> {flavor}
            </li>
          ) : null}
          {artist ? (
            <li>
              <strong>Artist:</strong> {artist}
            </li>
          ) : null}
          {number ? (
            <li>
              <strong>Number:</strong> {number}
            </li>
          ) : null}
          {power ? (
            <li>
              <strong>Power:</strong> {power}
            </li>
          ) : null}
          {toughness ? (
            <li>
              <strong>Toughness:</strong> {toughness}
            </li>
          ) : null}
          {reserved ? (
            <li>
              <strong>Reserved:</strong> {reserved}
            </li>
          ) : null}
        </ul>
        {imageUrl ? <img src={imageUrl} alt="" /> : null}
      </div>
    </div>
  );
}
