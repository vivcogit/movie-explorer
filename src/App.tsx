import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { IndexPage } from './pages/IndexPage/IndexPage';
import { MoviePage } from './pages/MoviePage/MoviePage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>

          <Route path="/movie/:id">
            <MoviePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
