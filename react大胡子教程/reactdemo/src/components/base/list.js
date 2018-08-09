import React, { Component } from 'react';

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
];

class List extends Component {
  render() {
    return (
      <ul>
        {
          users.map((user, index) =>
            <li key={index}>{user.username}</li>
          )
        }
      </ul>
    );
  }
}

export default List;
