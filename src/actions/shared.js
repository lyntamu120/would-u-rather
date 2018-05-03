import { _getUsers, _getQuestions } from '../utils/_DATA.js';

import { showLoading, hideLoading } from 'react-redux-loading';

import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { setAuthedUser } from './authedUser';

const authId = '';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    Promise.all([_getUsers(), _getQuestions()])
      .then(
        (values) => {
          const users = values[0];
          const questions = values[1];
          dispatch(receiveQuestions(questions));
          dispatch(receiveUsers(users));
          dispatch(setAuthedUser(authId));
          dispatch(hideLoading());
        }
      );
  }
}
