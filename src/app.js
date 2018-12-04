import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
};

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks} </p>
        <p>

        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
};

function Child() {
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}


export default class App extends React.Component {
  render() {
    return (
      <div className='ap11p'>
        <Parent />
      </div>
    );
  };
};


