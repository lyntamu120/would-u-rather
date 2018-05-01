import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollDetail extends Component {

  state = {
    selectedBtn: null
  }

  showInfo = (selector) => {
    const { opOneNum, opTwoNum, p1, p2 } = this.props;
    return selector === 'One'
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
    const name = e.target.name;
    this.setState(() => ({
      selectedBtn: name
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

        <button className="btn option-btn" name='One' onClick={this.handleVote}>{ opOneText }</button>
        { selectedBtn === 'One' && this.showInfo(selectedBtn) }
        <button className="btn option-btn" name='Two' onClick={this.handleVote}>{ opTwoText }</button>
        { selectedBtn === 'Two' && this.showInfo(selectedBtn) }
      </div>
    );
  }
}

function mapStateToProps( { questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const name = question['author'];
  const url = users[name]['avatarURL'];
  const numOfUsers = Object.keys(users).length;
  const opOneNum = question.optionOne.votes.length;
  const opTwoNum = question.optionTwo.votes.length;
  const p1 = (opOneNum / numOfUsers * 100).toFixed(2);
  const p2 = (opTwoNum / numOfUsers * 100).toFixed(2);
  return {
    url,
    name,
    opOneText: question.optionOne.text,
    opTwoText: question.optionTwo.text,
    opOneNum,
    opTwoNum,
    p1,
    p2
  }
}

export default connect(mapStateToProps)(PollDetail);
