const DisabledState = null;

function DisabledRedux(state = DisabledState, action) {
  switch (action.type) {
    case 'true':
      return {
        ...state,
        [action.payload] : {
          status: true,
          name : action.payload
        }
      };
    case 'false':
      return {
        ...state,
        [action.payload] : {
          status: false,
          name : action.payload
        }
      };
    default:
      return state;
  }
}
export {
    DisabledRedux,
    DisabledState
}