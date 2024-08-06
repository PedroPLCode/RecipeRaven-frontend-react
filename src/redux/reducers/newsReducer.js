export const getNews = (state) => state.news;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_NEWS = createActionName('UPDATE_NEWS');

export const updateNews = payload => ({ type: UPDATE_NEWS, payload });

const newsReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_NEWS:
      return action.payload
    default:
      return statePart;
  }
}

export default newsReducer;