import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import ingredientsReducer from './ingredientsReducer';
import searchResponseReducer from './searchResponseReducer';
import glutenFreeReducer from './glutenFreeReducer';
import veganReducer from './veganReducer';
import vegetarianReducer from './vegetarianReducer';
import alcoholFreeReducer from './alcoholFreeReducer';
import ketoFriendlyReducer from './ketoFriendlyReducer';
import lowCarbReducer from './lowCarbReducer';
import lowFatReducer from './lowFatReducer';
import pescatarianReducer from './pestacarianReducer';
import peenutFreeReducer from './peenutFreeReducer';
import treeNutFreeReducer from './treeNutFreeReducer';
import immunoSuportiveReducer from './immunoSuportiveReducer';
import sulfiteFreeReducer from './sulfiteFreeReducer';
import DASHReducer from './DASHReducer';

const subreducers = {
  ingredients: ingredientsReducer,
  vegan: veganReducer,
  vegetarian: vegetarianReducer,
  glutenFree: glutenFreeReducer,
  alcoholFree: alcoholFreeReducer,
  ketoFriendly: ketoFriendlyReducer,
  lowCarb: lowCarbReducer,
  lowFat: lowFatReducer,
  pescatarian: pescatarianReducer,
  peenutFree: peenutFreeReducer,
  treeNutFree: treeNutFreeReducer,
  immunoSuportive: immunoSuportiveReducer,
  sulfiteFree: sulfiteFreeReducer,
  DASH: DASHReducer,

  searchResponse: searchResponseReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;