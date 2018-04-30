import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewPoll extends Component {
  render() {
    return (
      <div>
        NewPoll
      </div>
    );
  }
}

export default connect()(NewPoll);
