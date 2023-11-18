export const getResponse = (state) => state.searchResponse;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_RESPONSE = createActionName('UPDATE_RESPONSE');

export const updateResponse = payload => ({ type: UPDATE_RESPONSE, payload });

const responseReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_RESPONSE:
        return action.payload
      default:
        return statePart;
    }
  }

export default responseReducer;