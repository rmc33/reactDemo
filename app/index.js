import 'babel-polyfill';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import App from './components/app';
import { Provider } from 'react-redux';
import configureStore from './reducers/store'
import React from 'react';
import { render } from 'react-dom';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
