import React, { Component } from 'react';

class likeButton extends Component {
  constructor() {
    super();
    this.state = {
      isLiked: false,
      count: 1,
      age: 20
    };
    this.changeState = this.changeState.bind(this);
  }

  // 改变状态
  changeState() {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  render() {
    const likeTxt = this.props.likeTxt || '取消';
    const unLikeTxt = this.props.unLikeTxt || '点赞';
    return (
      <div>
        <button id="like-btn" onClick={this.changeState}>
          <span className="like-text">{this.state.isLiked ? likeTxt : unLikeTxt}</span>
        </button>
      </div>
    );
  }
};

export default likeButton;
