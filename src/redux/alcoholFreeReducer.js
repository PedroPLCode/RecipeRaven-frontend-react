export const getAlcoholFree = (state) => state.alcoholFree;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_ALCOHOL_FREE = createActionName('UPDATE_ALCOHOL_FREE');

export const updateAlcoholFree = payload => ({ type: UPDATE_ALCOHOL_FREE, payload });

const alcoholFreeReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_ALCOHOL_FREE:
        return action.payload
      default:
        return statePart;
    }
  }

export default alcoholFreeReducer;