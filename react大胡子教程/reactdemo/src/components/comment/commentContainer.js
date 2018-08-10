import React, { Component } from 'react';
import CommentList from './commentList';
import CommentInput from './commentInput';
import './style.styl';

// 评论容器
// 包含 评论书写区 内容展示区 具体文字区域
class CommentContainer extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }
  handleSubmitComment(comment) {
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    })
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentContainer
