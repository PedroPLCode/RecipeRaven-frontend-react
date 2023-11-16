export const getKetoFriendly = (state) => state.ketoFriendly;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_KETO_FRIENDLY = createActionName('UPDATE_KETO_FRIENDLY');

export const updateKetoFriendly = payload => ({ type: UPDATE_KETO_FRIENDLY, payload });

const ketoFriendlyReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_KETO_FRIENDLY:
        return action.payload
      default:
        return statePart;
    }
  }

export default ketoFriendlyReducer;