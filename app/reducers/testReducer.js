import { combineReducers } from 'redux';

function search(state = { }, action) {
  switch (action.type) {
    case "SEARCH_STARTED":
      return Object.assign({}, state, {
        search_started: true
      });
    case "SEARCH_RESULTS":
      return Object.assign({}, state, {
        search_results: action.search_results,
        search_started: false
      })
    default:
      return state
  }
}

const testReducer = combineReducers({
  search
});

export default testReducer;
