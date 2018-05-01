import { showLoading, hideLoading } from 'react-redux-loading';

import { _saveQuestionAnswer } from '../utils/_DATA';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function saveQuesAnswer(qid, opType, usrName) {
  return {
    type: SAVE_QUESTION_ANSWER,
    qid,
    opType,
    usrName
  }
}

export function handleSaveQuesAnswer(info) {
  return (dispatch) => {
    const { authedUser, qid, answer } = info;
    const ohrAnswer = answer === 'optionOne' ? 'optionTwo' : 'optionOne';
    dispatch(saveQuesAnswer(qid, answer, authedUser));
    return _saveQuestionAnswer(info)
      .then(() => {
        console.log(`Answer of qid ${qid} has been saved, new answer is:  `, answer);
      })
      .catch((e) => {
        console.warn('Error in handleSaveQuesAnswer: ', e);
        dispatch(saveQuesAnswer(qid, ohrAnswer, authedUser));
        alert('There are some error saving the answer. Please try again');
      });
  }
}
