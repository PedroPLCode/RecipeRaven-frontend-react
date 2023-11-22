export const getSearchResponse = (state) => state.searchResponse;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_SEARCH_RESPONSE = createActionName('UPDATE_SEARCH_RESPONSE');

export const updateSearchResponse = payload => ({ type: UPDATE_SEARCH_RESPONSE, payload });

const searchResponseReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_SEARCH_RESPONSE:
        return action.payload
      default:
        return statePart;
    }
  }

export default searchResponseReducer;