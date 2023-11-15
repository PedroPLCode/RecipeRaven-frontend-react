export const getVegetarian = (state) => state.vegetarian;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_VEGETARIAN = createActionName('UPDATE_VEGETARIAN');

export const updateVegetarian = payload => ({ type: UPDATE_VEGETARIAN, payload });

const vegetarianReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_VEGETARIAN:
        return action.payload
      default:
        return statePart;
    }
  }

export default vegetarianReducer;