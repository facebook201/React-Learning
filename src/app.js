import React, { PureComponent } from 'react';
// import UncInput from './example/unc-input';
import Upload from './example/upload';

export default class App extends React.Component {

  render() {
    return (
      <div className='ap11p'>
        <Upload />
        {/* <input value={this.state.value} ref={input => this.input = input } onChange={this.handleChange} /> */}
      </div>
    );
  };
};


