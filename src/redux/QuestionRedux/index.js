const questionState = null;

function QuestionReducer(state = questionState, action) {
  switch (action.type) {
    case 'add':
      return state = [
          ...action.payload
    ];
    case 'delete':
      return state = [
          ...action.payload.splice(action.payloadid, 1)
      ];
    default:
      return state;
  }
}
export {
    QuestionReducer,
    questionState
}