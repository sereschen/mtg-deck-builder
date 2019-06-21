import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ id, imageUrl }) {
  return (
    <Link className="card" to={'card/' + id}>
      <img src={imageUrl || './fallback.jpg'} alt={id} />
    </Link>
  );
}
