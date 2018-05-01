import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleSaveQuesAnswer } from '../actions/questions';

class PollDetail extends Component {

  state = {
    style1: this.props.selectedBtn === 'optionOne' ? { outline: 0, fontWeight: 700, borderWidth: "2px" } : null,
    style2: this.props.selectedBtn === 'optionTwo' ? { outline: 0, fontWeight: 700, borderWidth: "2px" } : null
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
    const sty = { outline: 0, fontWeight: 700, borderWidth: "2px" };
    this.setState(() => ({
      style1: opType === 'optionOne' ? sty : null,
      style2: opType === 'optionTwo' ? sty : null
    }));
    dispatch(handleSaveQuesAnswer({
      authedUser,
      qid,
      answer: opType
    }));
  }

  render() {
    const { url, name, opOneText, opTwoText, selectedBtn } = this.props;

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

        <button
          className="btn option-btn"
          name='optionOne'
          onClick={this.handleVote}
          style={this.state.style1}
        >{ opOneText }</button>
        { selectedBtn && this.showInfo('optionOne') }
        <button
          className="btn option-btn"
          name='optionTwo'
          onClick={this.handleVote}
          style={this.state.style2}
        >
          { opTwoText }
        </button>
        { selectedBtn && this.showInfo('optionTwo') }
      </div>
    );
  }
}

function mapStateToProps( { questions, users, authedUser }, props) {

  const { id } = props.match.params;
  const question = questions[id];
  const authorName = question['author'];
  const url = users[authorName]['avatarURL'];
  const selectedBtn = users[authedUser]['answers'][id];
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
    authedUser,
    selectedBtn
  }
}

export default connect(mapStateToProps)(PollDetail);
