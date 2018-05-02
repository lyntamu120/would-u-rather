import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWER,
  ADD_QUESTION
 } from '../actions/questions';

export default function questions(state={}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case SAVE_QUESTION_ANSWER:
      const { qid, opType, usrName } = action;
      const otherType = opType === 'optionOne' ? 'optionTwo' : 'optionOne';
      const arrAdd = state[qid][opType]['votes'];
      const arrDelete = state[qid][otherType]['votes'];
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [opType]: {
            ...state[qid][opType],
            votes: arrAdd.includes(usrName)
            ? arrAdd.slice()
            : arrAdd.concat([usrName])
          },
          [otherType]: {
            ...state[qid][otherType],
            votes: arrDelete.includes(usrName)
            ? arrDelete.filter((e) => e !== usrName)
            : arrDelete.slice()
          }
        }
      }
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question
      }
    default:
      return state;
  }
}
