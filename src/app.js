import React, { PureComponent } from 'react';
// import Input from './example/input';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e) {
      this.setState({ value: event.target.value });
    }
  }

  render() {
    return (
      <div className={'app'}>
        <input value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  };
};
