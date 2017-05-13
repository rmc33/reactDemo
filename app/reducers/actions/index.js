import fetch from 'isomorphic-fetch';

export const addFilterRequest = (newFilter, throttle) => {
  console.log("adding filter here", newFilter);
  return (dispatch, getState) => {
    dispatch(addFilter(newFilter));
    if (!throttle) {
      dispatch(receiveChart('linechart', {data: 'is a chart'}));
      dispatch(receiveChart('treemap', {data: 'is a treemap'}));
    }
  }
}

export const removeFilterRequest = (filter) => {
  return (dispatch, getState) => {
    dispatch(removeFilter(filter));
    return dispatch(receiveChart('linechart', {}));
  }
}

export const addFilter = (newFilter) => {
  return {
    type: 'ADD_FILTER',
    newFilter
  }
}

export const removeFilter = (filter) => {
  return {
    type: 'REMOVE_FILTER',
    filter
  }
}

export const receiveChart = (chartType, json) => {
  return {
    type: 'RECEIVE_CHART',
    chartType, chartType,
    chartData: json,
    receivedAt: Date.now()
  }
}

export class DataFilter {
  constructor(name, key, values) {
    Object.assign(this, {name, key, values});
  }
}

