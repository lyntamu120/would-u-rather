import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    return (
      <div className='Question-Item'>
        <h4>Would you rather</h4>
        <p>{ this.props.optionOne.text } </p>
        <p>{ this.props.optionTwo.text } </p>
      </div>
    );
  }
}

function mapStateToProps({ questions }, { id }) {
  return {
    optionOne: questions[id].optionOne,
    optionTwo: questions[id].optionTwo
  }
}

export default connect(mapStateToProps)(Question);
