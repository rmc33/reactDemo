import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import testReducer from './testReducer'

export default function configureStore(preloadedState) {
  return createStore(
    testReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}