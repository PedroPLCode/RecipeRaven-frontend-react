export const getExcluded = (state) => state.excluded;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_EXCLUDED = createActionName('UPDATE_EXCLUDED');

export const updateExcluded = payload => ({ type: UPDATE_EXCLUDED, payload });

const excludedReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_EXCLUDED:
        return action.payload
      default:
        return statePart;
    }
  }

export default excludedReducer;