export const getLinkNextPage = (state) => state.linkNextPage;

const createActionName = actionName => `app/${actionName}`;
const UPDATE_LINK_NEXT_PAGE = createActionName('UPDATE_LINK_NEXT_PAGE');

export const updateLinkNextPage = payload => ({ type: UPDATE_LINK_NEXT_PAGE, payload });

const nextResultsPageReducer = (statePart = '', action) => {
  switch(action.type) {
    case UPDATE_LINK_NEXT_PAGE:
      return action.payload
    default:
      return statePart;
  }
}

export default nextResultsPageReducer;