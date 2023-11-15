export const getGlutenFree = (state) => state.glutenFree;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_GLUTEN_FREE = createActionName('UPDATE_GLUTEN_FREE');

export const updateGlutenFree = payload => ({ type: UPDATE_GLUTEN_FREE, payload });

const glutenFreeReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_GLUTEN_FREE:
        return action.payload
      default:
        return statePart;
    }
  }

export default glutenFreeReducer;