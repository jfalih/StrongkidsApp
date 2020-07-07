const ibuState = null;

function IbuRedux(state = ibuState, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
export {
    IbuRedux,
    ibuState
}