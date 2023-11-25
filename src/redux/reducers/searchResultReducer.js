export const getSearchResult = (state) => state.searchResult;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_SEARCH_RESULT = createActionName('UPDATE_SEARCH_RESULT');

export const updateSearchResult = payload => ({ type: UPDATE_SEARCH_RESULT, payload });

const searchResultReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_SEARCH_RESULT:
      return action.payload
    default:
      return statePart;
  }
}

export default searchResultReducer;