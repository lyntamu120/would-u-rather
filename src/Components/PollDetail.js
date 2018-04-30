import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollDetail extends Component {
  render() {
    const { url, name, optionOne, optionTwo } = this.props;
    console.log(url);
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

        <button className="btn option-btn">{optionOne.text}</button>
        <button className="btn option-btn">{optionTwo.text}</button>
      </div>
    );
  }
}

function mapStateToProps( { questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const name = question['author'];
  const url = users[name]['avatarURL'];
  return {
    url,
    name,
    optionOne: question.optionOne,
    optionTwo: question.optionTwo
  }
}

export default connect(mapStateToProps)(PollDetail);
