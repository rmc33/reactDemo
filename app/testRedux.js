import 'babel-polyfill';
import SearchView from './components/searchViewRedux';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import configureStore from './reducers/testStore'
import React from 'react';
import { render } from 'react-dom';

const store = configureStore();

render(
  <Provider store={store}>
    <SearchView />
  </Provider>,
  document.getElementById('root')
)
