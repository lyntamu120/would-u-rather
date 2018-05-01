import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleSaveQuesAnswer } from '../actions/questions';

class PollDetail extends Component {

  state = {
    selectedBtn: null
  }

  showInfo = (selector) => {
    const { opOneNum, opTwoNum, p1, p2 } = this.props;
    return selector === 'optionOne'
              ? (
                  <div className='center'>
                    <p>Votes: {opOneNum} Percentage: {p1 + '%'}</p>
                  </div>
                )
              : (
                  <div className='center'>
                    <p>Votes: {opTwoNum}  Percentage: {p2 + '%'}</p>
                  </div>
                )
  }

  handleVote = (e) => {
    e.preventDefault();
    const opType = e.target.name;
    const { dispatch, qid, authedUser } = this.props;
    dispatch(handleSaveQuesAnswer({
      authedUser,
      qid,
      answer: opType
    }));
    this.setState(() => ({
      selectedBtn: opType
    }));
  }

  render() {
    const { url, name, opOneText, opTwoText } = this.props;
    const { selectedBtn } = this.state;

    return (
      <div className='poll-detail-item'>
        <div className="poll-title">
          <img
            src={url}
            alt={`avator of ${name}`}
            className='avatar'
          />
          <h3 className='center'>Would You Rather</h3>
        </div>

        <button className="btn option-btn" name='optionOne' onClick={this.handleVote}>{ opOneText }</button>
        { selectedBtn === 'optionOne' && this.showInfo(selectedBtn) }
        <button className="btn option-btn" name='optionTwo' onClick={this.handleVote}>{ opTwoText }</button>
        { selectedBtn === 'optionTwo' && this.showInfo(selectedBtn) }
      </div>
    );
  }
}

function mapStateToProps( { questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const authorName = question['author'];
  const url = users[authorName]['avatarURL'];
  const numOfUsers = Object.keys(users).length;
  const opOneNum = question.optionOne.votes.length;
  const opTwoNum = question.optionTwo.votes.length;
  const p1 = (opOneNum / numOfUsers * 100).toFixed(2);
  const p2 = (opTwoNum / numOfUsers * 100).toFixed(2);
  return {
    url,
    authorName,
    opOneText: question.optionOne.text,
    opTwoText: question.optionTwo.text,
    opOneNum,
    opTwoNum,
    p1,
    p2,
    qid: id,
    authedUser
  }
}

export default connect(mapStateToProps)(PollDetail);
