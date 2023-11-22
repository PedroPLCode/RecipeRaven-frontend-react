import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import ingredientsReducer from './reducers/ingredientsReducer';
import excludedReducer from './reducers/excludedReducer';
import dietReducer from './reducers/dietReducer';
import searchResponseReducer from './reducers/searchResponseReducer';
import serverResponseReducer from './reducers/serverResponseReducer';

const subreducers = {
  ingredients: ingredientsReducer,
  excluded: excludedReducer,
  diet: dietReducer,
  searchResponse: searchResponseReducer,
  serverResponse: serverResponseReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;