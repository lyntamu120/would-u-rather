import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends Component {
  render() {
    const { id, optionOne, optionTwo } = this.props;
    return (
      <Link to={`/question/${id}`}>
        <h4>Would you rather</h4>
        <p>{ optionOne.text } </p>
        <p>{ optionTwo.text } </p>
      </Link>
    );
  }
}

function mapStateToProps({ questions }, { id }) {
  return {
    optionOne: questions[id].optionOne,
    optionTwo: questions[id].optionTwo,
    id
  }
}

export default connect(mapStateToProps)(Question);
