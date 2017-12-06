import { createStore } from 'redux';
import rootReducer from './reducers';
import { applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let store = configureStore({});

function configureStore(initialState){
   console.log(initialState);
   return createStore(rootReducer,initialState, applyMiddleware(thunk,logger))
}
export default store;