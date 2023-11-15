export const getVegan = (state) => state.vegan;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_VEGAN = createActionName('UPDATE_VEGAN');

export const updateVegan = payload => ({ type: UPDATE_VEGAN, payload });

const veganReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_VEGAN:
        return action.payload
      default:
        return statePart;
    }
  }

export default veganReducer;