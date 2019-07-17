import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import rootReducer from './reducers';
import CardSearch from './components/CardSearch/CardSearch';
import CardDetails from './components/CardDetails/CardDetails';
import DecksList from './components/DeckBuilder/DeckBuilder';
import { loadState, saveState } from './services/localStorageService';

const DECKS_LIST = 'DECKS_LIST';
const store = createStore(rootReducer, loadState(DECKS_LIST));

store.subscribe(() => {
  saveState(DECKS_LIST, store.getState());
});

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <ul className="header">
          <li>
            <Link to="/">Card Search</Link>
          </li>
          <li>
            <Link to="/deck-builder">Deck Builder</Link>
          </li>
        </ul>

        <hr />

        <div className="app">
          <Switch>
            <Route exact path="/" component={CardSearch} />
            <Route path="/card/:id" component={CardDetails} />
            <Route path="/deck-builder" component={DecksList} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
