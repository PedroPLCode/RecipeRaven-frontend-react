export const getIngredients = (state) => state.ingredients;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_INGREDIENTS = createActionName('UPDATE_INGREDIENTS');

export const updateIngredients = payload => ({ type: UPDATE_INGREDIENTS, payload });

const ingredientsReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_INGREDIENTS:
      return action.payload
    default:
      return statePart;
  }
}

export default ingredientsReducer;