import React from 'react';
import '../styles/upload.less';

export default class Upload extends React.Component {
  static defaultProps = {
    action: '',
    className: '',
    data: {},
    disabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      dragState: 'drop'
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(event) {
    this.fileInput.click();
  }

  render() {
    const upload_input = 'upload_input';
    return (
      <div className="upload">
        <input type="file" className={upload_input} ref={input => { this.fileInput = input }} /> 
        <button onClick={this.handleUpload} className="upload-btn">上传图片</button>
      </div>
    );
  }
};
