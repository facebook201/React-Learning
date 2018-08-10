import React, { Component } from 'react';

// 单个评论内容
class Comment extends Component {
  render() {
    return (
      <div>
        <div>
          <span>{this.props.comment.username}：</span>
          <span>{this.props.comment.content}</span>
        </div>
      </div>
    );
  }
}

export default Comment
