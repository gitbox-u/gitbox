import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import loginReducer from './reducers/loginReducer';
import reposReducer from './reducers/reposReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
  login: loginReducer,
  repos: reposReducer
}), applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider
            store={store}
        >
          <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();