export const getLowCarb = (state) => state.lowCarb;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_LOW_CARB = createActionName('UPDATE_LOW_CARB');

export const updateLowCarb = payload => ({ type: UPDATE_LOW_CARB, payload });

const lowCarbReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_LOW_CARB:
        return action.payload
      default:
        return statePart;
    }
  }

export default lowCarbReducer;