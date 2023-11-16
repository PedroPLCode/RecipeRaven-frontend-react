export const getLowFat = (state) => state.lowFat;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_LOW_FAT = createActionName('UPDATE_LOW_FAT');

export const updateLowFat = payload => ({ type: UPDATE_LOW_FAT, payload });

const lowFatReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_LOW_FAT:
        return action.payload
      default:
        return statePart;
    }
  }

export default lowFatReducer;