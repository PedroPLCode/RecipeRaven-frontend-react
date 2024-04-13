export const getUser = (state) => state.user;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_USER = createActionName('UPDATE_USER');

export const updateUser = payload => ({ type: UPDATE_USER, payload });

const userReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_USER:
      return action.payload
    default:
      return statePart;
  }
}

export default userReducer;