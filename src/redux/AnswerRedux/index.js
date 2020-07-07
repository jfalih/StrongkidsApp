const answerState = {
  result_id: 0,
  answers : []
};

function AnswerRedux(state = answerState, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
        return {
          ...state,
          result_id: action.result_id,
          answers: [...state.answers,action.payload]
        };
    case 'UBAH_NULL_ANSWER':
        return {
          ...state,
          result_id: 0,
          answers: action.payload
        };
    case 'UBAH_ANSWER':
      return {
        ...state,
        result_id: 0,
        answers: [...state.answers.slice(0, action.payload), ...state.answers.slice(action.payload + 1)]
      }
    default:
      return state;
  }
}
export {
    AnswerRedux,
    answerState
}