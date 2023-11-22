export const getServerResponse = (state) => state.serverResponse;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_SERVER_RESPONSE = createActionName('UPDATE_SERVER_RESPONSE');

export const updateServerResponse = payload => ({ type: UPDATE_SERVER_RESPONSE, payload });

const serverResponseReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_SERVER_RESPONSE:
        return action.payload
      default:
        return statePart;
    }
  }

export default serverResponseReducer;