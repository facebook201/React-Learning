import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component { 
  
  static propTypes = {
    onFocus: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  focus() {
    setTimeout(() => {
      this.refs.input.focus()
    });
  }
  
  handleFocus(e) {
    const { onFocus } = this.props;
    if (onFocus) onFocus(e)
  }

  handleChange(e) {
    // const { onChange } = this.props;
    // if (onChange) {
    //   onChange(e.target.value);
    // }
    this.
  }
  
  render() {
    const { type, ...otherProps } = this.props;

    return (
      <div className="r-input">
        <input { ...otherProps }
          ref="input"
          placeholder="请输入"
          type={type}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }
};