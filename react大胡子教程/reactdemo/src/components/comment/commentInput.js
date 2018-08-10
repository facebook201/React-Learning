import React, { Component } from 'react';

// 评论文字输入区
class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      username: '', // 用户
      content: ''   // 评论
    };
    this.changeInputName = this.changeInputName.bind(this);
    this.changeAreaComment = this.changeAreaComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeInputName(event) {
    this.setState({
      username: event.target.value
    });
  }
  changeAreaComment(event) {
    this.setState({
      content: event.target.value
    })
  }
  handleSubmit() {
    // 如果父组件传了一个方法
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({username, content});
    }
    this.setState({content: ''});
  }
  render() {
    return (
      <div className="comment-input">
        <div className="comment-filed">
          <span className="comment-field-name">用户名:</span>
          <div className="comment-field-input">
            <input className="username-input"
              value={this.state.username}
              onChange={this.changeInputName}/>
          </div>
        </div>

        <div className="comment-field">
          <span className="comment-field-name">评论内容:</span>
          <div className="comment-field-input">
            <textarea value={this.state.content} onChange={this.changeAreaComment}/>
          </div>
        </div>

        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    );
  }
}

export default CommentInput
