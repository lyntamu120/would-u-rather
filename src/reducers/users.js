import { RECEIVE_USERS } from '../actions/users';

export default function questions(state={}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state;
  }
}
