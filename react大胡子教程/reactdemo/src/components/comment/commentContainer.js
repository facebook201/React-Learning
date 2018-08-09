import React, { Component } from 'react';
import CommentList from './commentList';
import CommentInput from './commentInput';

// 评论容器
// 包含 评论书写区 内容展示区 具体文字区域
class CommentContainer extends Component {
  render() {
    return (
      <div className="wrapper">
        <CommentInput />
        <CommentList />
      </div>
    );
  }
}

export default CommentContainer
