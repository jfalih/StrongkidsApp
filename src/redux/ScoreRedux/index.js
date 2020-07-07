const ScoreState = 0;

function ScoreRedux(state = ScoreState, action) {
  switch (action.type) {
    case 'UBAH_SCORE':
        return action.payload;
    default:
      return state;
  }
}
export {
    ScoreRedux,
    ScoreState
}