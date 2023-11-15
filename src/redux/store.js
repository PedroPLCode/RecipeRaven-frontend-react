import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import ingredientsReducer from './ingredientsReducer';
import searchResponseReducer from './searchResponseReducer';
import glutenFreeReducer from './glutenFreeReducer';
import veganReducer from './veganReducer';
import vegetarianReducer from './vegetarianReducer';

const subreducers = {
  ingredients: ingredientsReducer,
  vegan: veganReducer,
  vegetarian: vegetarianReducer,
  glutenFree: glutenFreeReducer,
  searchResponse: searchResponseReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;