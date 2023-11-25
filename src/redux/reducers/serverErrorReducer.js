export const getServerError = (state) => state.serverError;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_SERVER_ERROR = createActionName('UPDATE_SERVER_ERROR');

export const updateServerError = payload => ({ type: UPDATE_SERVER_ERROR, payload });

const serverErrorReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_SERVER_ERROR:
      return action.payload
    default:
      return statePart;
  }
}

export default serverErrorReducer;