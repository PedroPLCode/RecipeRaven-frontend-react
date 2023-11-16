export const getPescatarian = (state) => state.pescatarian;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_PESTACARIAN = createActionName('UPDATE_PESTACARIAN');

export const updatePescatarian = payload => ({ type: UPDATE_PESTACARIAN, payload });

const pescatarianReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_PESTACARIAN:
        return action.payload
      default:
        return statePart;
    }
  }

export default pescatarianReducer;