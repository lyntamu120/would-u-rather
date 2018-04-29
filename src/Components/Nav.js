import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return(
      <nav className="nav">
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' exact activeClassName='active'>
            NewPoll
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderBoard' exact activeClassName='active'>
            leaderBoard
          </NavLink>
        </li>
      </nav>
    );
  }
}
