import React, { useState, useEffect } from 'react';
import mtg from 'mtgsdk';
import { useDebounce } from '../../hooks/useDebounce';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

const RED = 'red';
const WHITE = 'white';
const BLUE = 'blue';
const BLACK = 'black';
const GREEN = 'green';

export default function CardSearch() {
  const [searchText, setSearchText] = useState('');
  const [colors, setColors] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const delayedText = useDebounce(searchText, 1000);

  function toggleColor(colors, color) {
    if (colors.includes(color)) {
      return colors.filter(item => color !== item);
    } else {
      return [...colors, color];
    }
  }
  useEffect(() => {
    if (delayedText.length > 2) {
      setIsloading(true);
      mtg.card
        .where({ name: delayedText, colors: colors.join(',') })
        .then(resCards => {
          setCards(resCards);
          setIsloading(false);
        });
    }
    return () => {
      setCards([]);
    };
  }, [delayedText, colors]);
  return (
    <div className="card-search">
      <h1>Card Search</h1>
      <div className="filters">
        <div className="filter">
          <label htmlFor="search-input">Card Name</label>
          <input
            id="search-input"
            type="text"
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
          />
        </div>

        <div className="filter">
          <label htmlFor="search-input">Red</label>
          <input
            id="search-input"
            type="checkbox"
            value={RED}
            onChange={() => setColors(toggleColor(colors, RED))}
          />
          <label htmlFor="search-input">White</label>
          <input
            id="search-input"
            type="checkbox"
            value={WHITE}
            onChange={() => setColors(toggleColor(colors, WHITE))}
          />
          <label htmlFor="search-input">Blue</label>
          <input
            id="search-input"
            type="checkbox"
            value={BLUE}
            onChange={() => setColors(toggleColor(colors, BLUE))}
          />
          <label htmlFor="search-input">Black</label>
          <input
            id="search-input"
            type="checkbox"
            value={BLACK}
            onChange={() => setColors(toggleColor(colors, BLACK))}
          />
          <label htmlFor="search-input">Green</label>
          <input
            id="search-input"
            type="checkbox"
            value={GREEN}
            onChange={() => setColors(toggleColor(colors, GREEN))}
          />
        </div>
      </div>

      {!isLoading ? (
        <div className="card-list">
          {cards.map(card => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
