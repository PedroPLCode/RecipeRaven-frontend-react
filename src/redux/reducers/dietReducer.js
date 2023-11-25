export const getDiet = (state) => state.diet;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_DIET = createActionName('UPDATE_DIET');

export const updateDiet = payload => ({ type: UPDATE_DIET, payload });

const dietReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_DIET:
      return action.payload
    default:
      return statePart;
  }
}

export default dietReducer;