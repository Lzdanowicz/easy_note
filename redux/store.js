import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'; 

let finalCreateStore = compose(
  applyMiddleware(thunk, createLogger())
)(createStore)


export default function configureStore(initialState={}) {
  return finalCreateStore(reducer, initialState)
}
