import { RECEIVE_USERS } from '../actions/users';
import { SAVE_QUESTION_ANSWER } from '../actions/questions';

export default function users(state={}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SAVE_QUESTION_ANSWER:
      const { qid, usrName, opType } = action;
      return {
        ...state,
        [usrName]: {
          ...state[usrName],
          answers: {
            ...state[usrName]['answers'],
            [qid]: opType
          }
        }
      }
    default:
      return state;
  }
}
