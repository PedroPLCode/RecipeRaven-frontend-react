export const getSulfiteFree = (state) => state.sulfiteFree;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_SULFITE_FREE = createActionName('UPDATE_SULFITE_FREE');

export const updateSulfiteFree = payload => ({ type: UPDATE_SULFITE_FREE, payload });

const sulfiteFreeReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_SULFITE_FREE:
        return action.payload
      default:
        return statePart;
    }
  }

export default sulfiteFreeReducer;