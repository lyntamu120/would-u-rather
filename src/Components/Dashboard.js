import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from './Question';

class Dashboard extends Component {
  state = {
    unanswered: true,
    leftBgColor: '#fff',
    rightBgColor: '#fff'
  }

  changeToUnanswered = (e) => {
    e.preventDefault();
    this.setState(() => ({
      unanswered: true,
      leftBgColor: '#ccc',
      rightBgColor: '#fff'
    }));
  }

  changeToAnswered = (e) => {
    e.preventDefault();
    this.setState(() => ({
      unanswered: false,
      leftBgColor: '#fff',
      rightBgColor: '#ccc'
    }));
  }

  render() {
    const { unansweredIds, answeredIds } = this.props;
    const pollIds = this.state.unanswered ? unansweredIds : answeredIds;

    return (
      <div>
        <div className="btn-group">
          <button
            style={{backgroundColor: this.state.leftBgColor}}
            className='title-btn left-btn'
            onClick={this.changeToUnanswered}>
            Unanswered
          </button>
          <button
            style={{backgroundColor: this.state.rightBgColor}}
            className='title-btn right-btn'
            onClick={this.changeToAnswered}>
            Answered
          </button>
        </div>
          <ul>
            {pollIds.map((id) => (
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
    answeredIds
  }
}

export default connect(mapStateToProps)(Dashboard);
