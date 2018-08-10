import React, { Component } from 'react';
import CommentContainer from './components/comment/commentContainer';
import './index.styl';

class App extends Component {
    render() {
        return (
          <div className="App">
            <CommentContainer />
          </div>
        );
    }
}

export default App;
