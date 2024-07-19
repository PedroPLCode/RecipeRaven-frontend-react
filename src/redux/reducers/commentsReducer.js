export const getComments = (state) => state.comments;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_COMMENTS = createActionName('UPDATE_COMMENTS');

export const updateComments = payload => ({ type: UPDATE_COMMENTS, payload });

const commentsReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_COMMENTS:
      return action.payload
    default:
      return statePart;
  }
}

export default commentsReducer;