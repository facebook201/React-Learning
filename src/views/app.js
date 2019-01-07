import * as React from 'react';

class Parent extends React.Component {
  state = {
    msg: 'start'
  };

  componentDidUpdate() {
    console.log('parent update');
  }

  getMessage = (msg) => {
    this.setState({
      msg: msg
    });
  }

  render() {
    return (
      <div className="parent">
        父组件: {this.state.msg}
        <Child getMessage={this.getMessage}>
        </Child>
      </div>
    )
  }
}

class Child extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.getMessage('end')
    }, 2000);
  }

  componentDidUpdate() {
    console.log('child update')
  }

  render() {
    return (
      <div>
        {this.props.msg}
      </div>
    )
  }
}


export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Parent />
      </div>
    );
  };
};
