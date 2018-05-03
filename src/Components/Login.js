import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    login: false,
    loginUser: ''
  }

  handleLoginAndLogout = (e) => {
    e.preventDefault();
    const { dispatch, usrIds } = this.props;
    const { login, loginUser } = this.state;
    if (login === true) {
      this.setState(() => ({
        login: false
      }));
      dispatch(setAuthedUser(''));
      return;
    }
    if (loginUser === '') {
      this.setState({
        loginUser: usrIds[0]
      });
      dispatch(setAuthedUser(usrIds[0]));
    } else {
      dispatch(setAuthedUser(loginUser));
    }
    this.setState(() => ({
      login: true
    }));
  }

  handleChange =(e) => {
    e.preventDefault();
    const selectedUser = e.target.value;
    this.setState(() => ({
      loginUser: selectedUser
    }));
  }

  render() {
    const { usrIds } = this.props;
    const { loginUser, login } = this.state;
    return (
      <div className='login-panel'>
        {
        login === true
        ? (<h4 className='login-title'>Login User is: {loginUser}</h4>)
        : (<select value={this.state.loginUser} onChange={this.handleChange}>
              {usrIds.map((id) => (
                <option value={id} key={id}>{id}</option>
              ))}
            </select>)
        }
        <button onClick={this.handleLoginAndLogout}>{login === true ? 'Logout' : 'Login'}</button>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    usrIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login);
