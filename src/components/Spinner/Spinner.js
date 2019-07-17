import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Spinner.scss';
export default function Spinner({ isLoading }) {
  return (
    <div className="spinner">
      <FontAwesomeIcon icon={faSpinner} pulse size="10x" />
    </div>
  );
}
