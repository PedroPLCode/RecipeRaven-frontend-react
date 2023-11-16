export const getPeenutFree = (state) => state.peenutFree;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_PEENUT_FREE = createActionName('UPDATE_PEENUT_FREE');

export const updatePeenutFree = payload => ({ type: UPDATE_PEENUT_FREE, payload });

const peenutFreeReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_PEENUT_FREE:
        return action.payload
      default:
        return statePart;
    }
  }

export default peenutFreeReducer;