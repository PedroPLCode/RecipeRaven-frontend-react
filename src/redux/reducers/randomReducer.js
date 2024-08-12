export const getRandom = (state) => state.random;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_RANDOM = createActionName('UPDATE_RANDOM');

export const updateRandom = payload => ({ type: UPDATE_RANDOM, payload });

const randomReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_RANDOM:
      return { ...statePart, value: action.payload };
    default:
      return statePart;
  }
}

export default randomReducer;