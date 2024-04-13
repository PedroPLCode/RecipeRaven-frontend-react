export const getPosts = (state) => state.posts;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_POSTS = createActionName('UPDATE_POSTS');

export const updatePosts = payload => ({ type: UPDATE_POSTS, payload });

const postsReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_POSTS:
      return action.payload
    default:
      return statePart;
  }
}

export default postsReducer;