import React from 'react';
import { NavLink } from 'react-router-dom';

import Login from './Login';

export default function Nav() {
  return (
    <nav className="nav">
      <ul>
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
      </ul>
      <Login />
    </nav>
  );
}
