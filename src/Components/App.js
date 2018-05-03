import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Nav from './Nav';
import LeaderBoard from './LeaderBoard';
import NewPoll from './NewPoll';
import PollDetail from './PollDetail';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            <hr/>
            {this.props.loading === true
              ? (<h1>Loading...</h1>)
              : authedUser === ''
                ? <h1>Please Login</h1>
                : (<div>
                      <Route path='/' exact component={ Dashboard } />
                      <Route path='/add' component={ NewPoll } />
                      <Route path='/leaderboard' component={ LeaderBoard } />
                      <Route path='/question/:id' component={ PollDetail } />
                   </div>)
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
