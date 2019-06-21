import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';
import CardSearch from './components/CardSearch/CardSearch';
import CardDetails from './components/CardDetails/CardDetails';

export default function App() {
  return (
    <Router>
      <ul className="header">
        <li>
          <Link to="/">Card Search</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={CardSearch} />
      <Route path="/card/:id" component={CardDetails} />
    </Router>
  );
}
