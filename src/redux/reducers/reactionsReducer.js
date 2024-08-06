export const getReactions = (state) => state.reactions;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_REACTIONS = createActionName('UPDATE_REACTIONS');

export const updateReactions = payload => ({ type: UPDATE_REACTIONS, payload });

const reactionsReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_REACTIONS:
      return action.payload
    default:
      return statePart;
  }
}

export default reactionsReducer;