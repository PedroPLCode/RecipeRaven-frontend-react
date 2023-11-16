export const getTreeNutFree = (state) => state.treeNutFree;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_TREE_FREE = createActionName('UPDATE_TREE_FREE');

export const updateTreeNutFree = payload => ({ type: UPDATE_TREE_FREE, payload });

const treeNutFreeReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_TREE_FREE:
        return action.payload
      default:
        return statePart;
    }
  }

export default treeNutFreeReducer;