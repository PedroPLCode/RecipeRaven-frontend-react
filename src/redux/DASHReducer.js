export const getDASH = (state) => state.DASH;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_DASH = createActionName('UPDATE_DASH');

export const updateDASH = payload => ({ type: UPDATE_DASH, payload });

const DASHReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_DASH:
        return action.payload
      default:
        return statePart;
    }
  }

export default DASHReducer;