import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.data.map((user, index) => (
            <li key={user.usrName} className='LeaderBoard-item'>
              <h2 className='rank'>{index + 1}</h2>
              <div className='avator-name'>
                <img
                  src={user.avatarUrl}
                  alt={`avator of ${user.usrName}`}
                  className='avatar'
                />
                <h4>{user.usrName}</h4>
              </div>
              <div className="score-panel">
                <p># of answers: {user.numOfAnw}</p>
                <p># of questions: {user.numOfQues}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usrIds = Object.keys(users);
  const data = usrIds.map(id => ({
    usrName: users[id].name,
    avatarUrl: users[id].avatarURL,
    numOfAnw: Object.keys(users[id]['answers']).length,
    numOfQues: users[id]['questions'].length
  }));
  data.sort((a, b) => {
    const scoreb = b['numOfAnw'] + b['numOfQues'];
    const scorea = a['numOfAnw'] + a['numOfQues'];
    return scoreb - scorea;
  });
  return { data };
}

export default connect(mapStateToProps)(LeaderBoard);
