import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleAddQuestion } from '../actions/questions';

class NewPoll extends Component {
  state = {
    op1: '',
    op2: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
    const { op1, op2 } = this.state;
    dispatch(handleAddQuestion({
      author: authedUser,
      optionOneText: op1,
      optionTwoText: op2
    }));
    this.setState(() => ({
      op1: '',
      op2: ''
    }));
  }

  handleChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    this.setState(() => ({
      [id]: val
    }));
  }

  render() {
    return (
      <div className='center'>
        <h3 className='center'>Would You Rather</h3>
        <form className='newpoll-form' onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="op1" className='text-label'>Option1</label>
            <input
              type="text"
              id='op1'
              className='text-input'
              onChange={this.handleChange}
              value={this.state.op1}
            />
          </div>
          <div className="input-group">
            <label htmlFor="op2" className='text-label'>Option2</label>
            <input
              type="text"
              id='op2'
              className='text-input'
              onChange={this.handleChange}
              value={this.state.op2}
            />
          </div>
          <button type='submit' className='btn'>Post</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {authedUser};
}

export default connect(mapStateToProps)(NewPoll);
