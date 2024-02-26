export const getBoard = (state) => state.board;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_BOARD = createActionName('UPDATE_BOARD');

export const updateBoard = payload => ({ type: UPDATE_BOARD, payload });

const boardReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_BOARD:
      return action.payload
    default:
      return statePart;
  }
}

export default boardReducer;