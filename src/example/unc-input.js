import React from 'react';

export default class UncInput extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleSubmitClick() {
    const name = this.input.value;
    console.log(name);
  } 

  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
};