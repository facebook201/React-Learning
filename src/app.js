import React, { PureComponent } from 'react';
import UncInput from './example/unc-input';

export default class App extends React.Component {

  render() {
    return (
      <div className='app'>
        <UncInput />
        {/* <input value={this.state.value} ref={input => this.input = input } onChange={this.handleChange} /> */}
      </div>
    );
  };
};


