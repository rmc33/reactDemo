import { combineReducers } from 'redux';


function charts(state = { }, action) {
  switch (action.type) {
    case "ADD_FILTER":
      console.log('add filter', action); 
      return state;
    case "REMOVE_FILTER":
      console.log('remove filter', action);
      return state;
    case "RECEIVE_CHART":
      console.log("returning new state", Object.assign({}, state, {
        chartData: { ...state.chartData, [action.chartType]: action.chartData }
      }));

      return Object.assign({}, state, {
        chartData: { ...state.chartData, [action.chartType]: action.chartData }
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  charts
});

export default rootReducer;
