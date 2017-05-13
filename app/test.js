import 'babel-polyfill';
import SearchView from './components/searchView';
import React from 'react';
import { render } from 'react-dom';

render(
  <SearchView />,
  document.getElementById('root')
)
