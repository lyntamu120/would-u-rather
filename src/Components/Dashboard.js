import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from './Question';

class Dashboard extends Component {

  render() {
    const { questions, unansweredIds, answeredIds } = this.props;
    return (
      <div>
        <h3 className='center'>Unswered Questions</h3>
          <ul>
            {unansweredIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        <hr />
        <h3 className='center'>Answered Questions</h3>
        <ul>
          {answeredIds.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser, questions}) {
  const hisAnswers = Object.keys(users[authedUser]['answers']);
  const allQuestions = Object.keys(questions);
  const answeredIds = hisAnswers.sort((anId1, anId2) => questions[anId2] - questions[anId1]);
  const unansweredIds = allQuestions.filter(q => !answeredIds.includes(q));
  return {
    unansweredIds,
    answeredIds,
    questions
  }
}

export default connect(mapStateToProps)(Dashboard);
