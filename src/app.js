import React, { PureComponent } from 'react';
// import eventProxy from './utils/eventProxy';

import { createStore } from 'redux';

function reducer(state = {}, action) {
  return action;
}

let store = createStore(reducer);

console.log(store);

class Parent extends React.Component {

  componentDidUpdate() {
    console.log('parent Update');
  }

  render() {
    return (
      <div>
        <Child_1 />
        <Child_2 />
      </div>
    ); 
  }
}

class Child_1 extends React.Component {
  componentDidMount() {
    // setTimeout(() => {
    //   // 发布msg 事件
    //   eventProxy.trigger('msg', 'end');
    // }, 1000);

    setTimeout(() => {
      store.dispatch({
        type: 'child_2',
        data: 'hello'
      });
    }, 1000);

    setTimeout(() => {
      store.dispatch({
        type: 'child_2_1',
        data: 'bye'
      });
    }, 2000);
  }

  componentDidUpdate() {
    console.log('child_1 update');
  }

  render() {
    return (
      <div>
        <p>Child_1</p>
      </div>
    );
  }
};

class Child_2 extends React.Component {

  constructor() {
    super();
    this.state = {
      msg: 'start'
    };
  }
  
  componentDidUpdate() {
    console.log('child_2 update', store.getState());
  }

  componentDidMount() {
    // 监听msg事件
    // eventProxy.on('msg', (msg) => {
    //   console.log(msg);
    //   this.setState({
    //     msg
    //   });
    // });

    store.subscribe(() => {
      let state = store.getState();
      if (state.type === 'child_2') {
        this.setState({
          msg: state.data
        });
      }
    });

  }

  render() {
    return (
      <div>
        <p>Child_2 component: {this.state.msg}</p>
        <Child_2_1 />
      </div>
    );
  }
};

class Child_2_1 extends React.Component {
  
  constructor() {
    super();
    this.state = {
      msg: 'start'
    };
  }
  
  componentDidUpdate() {
    console.log('child_2_1 update', store.getState());
  }

  componentDidMount() {
    store.subscribe(()=> {
      let state = store.getState();
      if (state.type === 'child_2_1') {
        this.setState({
          msg: state.data
        });
      }
    });
  }

  render() {
    return (
      <div>
        <p>Child_2_1: {this.state.msg}</p>
      </div>
    );
  }
};


export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Parent />
      </div>
    );
  };
};
