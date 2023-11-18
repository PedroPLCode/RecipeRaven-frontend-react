import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import ingredientsReducer from './reducers/ingredientsReducer';
import excludedReducer from './reducers/excludedReducer';
import dietReducer from './reducers/dietReducer';
import responseReducer from './reducers/responseReducer';


const subreducers = {
  ingredients: ingredientsReducer,
  excluded: excludedReducer,
  diet: dietReducer,
  response: responseReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;