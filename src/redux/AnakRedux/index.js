const anakState = null;

function anakRedux(state = anakState, action) {
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
    anakRedux,
    anakState
}