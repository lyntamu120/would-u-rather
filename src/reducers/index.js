import { combineReducers } from 'redux';

import authedUser from './authUser';
import questions from './questions';
import users from './users';

export default combineReducers({
  authedUser,
  questions,
  users
});
