const DataIbuState = null;

function DataIbuRedux(state = DataIbuState, action) {
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
    DataIbuRedux,
    DataIbuState
}