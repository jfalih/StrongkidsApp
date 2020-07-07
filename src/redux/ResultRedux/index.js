const ResultState = null;

function ResultRedux(state = ResultState, action) {
  switch (action.type) {
    case 'UBAH_RESULT':
        return {
            ...state,
            ...action.payload
        };
    default:
      return state;
  }
}
export {
    ResultRedux,
    ResultState
}