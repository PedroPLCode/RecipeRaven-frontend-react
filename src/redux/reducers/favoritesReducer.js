export const getFavorites = (state) => state.favorites;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_FAVORITES = createActionName('UPDATE_FAVORITES');

export const updateFavorites = payload => ({ type: UPDATE_FAVORITES, payload });

const favoritesReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_FAVORITES:
      return action.payload
    default:
      return statePart;
  }
}

export default favoritesReducer;