import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import login from './reducers/login';
import repositories from './reducers/repositories';
import users from './reducers/users';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
  login: login,
  repos: repositories,
  users: users
}), applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider
      store={store}
    >
      <App/>
    </Provider>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();