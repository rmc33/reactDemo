import fetch from 'isomorphic-fetch';

export const doSearchRequest = (search_value) => {
  console.log("starting search", search_value);
  return (dispatch, getState) => {
    dispatch(searchStarted());
    dispatch(searchResults({data: ['first result', 'second result']}));
  }
}

export const searchStarted = () => {
  return {
    type: 'SEARCH_STARTED',
    startedAt: Date.now()
  }
}

export const searchResults = (search_results) => {
  return {
    type: 'SEARCH_RESULTS',
    search_results: search_results,
    receivedAt: Date.now()
  }
}



