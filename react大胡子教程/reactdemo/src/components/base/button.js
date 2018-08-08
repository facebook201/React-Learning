import React, { Component } from 'react';

class likeButton extends Component {
  constructor() {
    super();
    this.state = { isLiked: false };
  }

  render() {
    return (
      <button id="like-btn">
        <span className="like-text" role="img">赞</span>
      </button>
    );
  }
};

export default likeButton;
