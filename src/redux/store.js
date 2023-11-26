import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import ingredientsReducer from './reducers/ingredientsReducer';
import excludedReducer from './reducers/excludedReducer';
import dietReducer from './reducers/dietReducer';
import searchResultReducer from './reducers/searchResultReducer';
import serverResponseReducer from './reducers/serverResponseReducer';
import serverErrorReducer from './reducers/serverErrorReducer';
import favoritesReducer from './reducers/favoritesReducer';

const subreducers = {
  ingredients: ingredientsReducer,
  excluded: excludedReducer,
  diet: dietReducer,
  searchResult: searchResultReducer,
  serverResponse: serverResponseReducer,
  serverError: serverErrorReducer,
  favorites: favoritesReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;