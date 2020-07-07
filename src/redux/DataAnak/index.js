const DataAnakState = null;

function DataAnakRedux(state = DataAnakState, action) {
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
    DataAnakRedux,
    DataAnakState
}