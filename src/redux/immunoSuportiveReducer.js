export const getImmunoSuportive = (state) => state.immunoSuportive;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_IMMUNO_SUPORTIVE = createActionName('UPDATE_IMMUNO_SUPORTIVE');

export const updateImmunoSuportive = payload => ({ type: UPDATE_IMMUNO_SUPORTIVE, payload });

const immunoSuportiveReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_IMMUNO_SUPORTIVE:
        return action.payload
      default:
        return statePart;
    }
  }

export default immunoSuportiveReducer;