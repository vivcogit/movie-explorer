import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Header } from './components/Header/Header';

import { IndexPage } from './pages/IndexPage/IndexPage';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { SearchPage } from './pages/SearchPage/SearchPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>

          <Route path="/movie/:id">
            <MoviePage />
          </Route>

          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
