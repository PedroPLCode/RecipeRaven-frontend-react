export const getQuote = (state) => state.quote;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_QUOTE = createActionName('UPDATE_QUOTE');

export const updateQuote = payload => ({ type: UPDATE_QUOTE, payload });

const quoteReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_QUOTE:
      return action.payload
    default:
      return statePart;
  }
}

export default quoteReducer;