import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import quoteReducer from './reducers/quoteReducer';
import ingredientsReducer from './reducers/ingredientsReducer';
import excludedReducer from './reducers/excludedReducer';
import dietReducer from './reducers/dietReducer';
import searchResultReducer from './reducers/searchResultReducer';
import serverResponseReducer from './reducers/serverResponseReducer';
import serverErrorReducer from './reducers/serverErrorReducer';
import favoritesReducer from './reducers/favoritesReducer';
import nextResultsPageReducer from './reducers/nextResultsPageReducer';
import userReducer from './reducers/userReducer';
import postsReducer from './reducers/postsReducer';
import commentsReducer from './reducers/commentsReducer';

const subreducers = {
  quote: quoteReducer,
  ingredients: ingredientsReducer,
  excluded: excludedReducer,
  diet: dietReducer,
  searchResult: searchResultReducer,
  serverResponse: serverResponseReducer,
  serverError: serverErrorReducer,
  favorites: favoritesReducer,
  linkNextPage: nextResultsPageReducer,
  posts: postsReducer,
  comments: commentsReducer,
  user: userReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;