import React, { PureComponent } from 'react';

class ListOfWords extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props)
    return <div>{this.props.words.join(',')}</div>
  }
};

export default class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const words = this.state.words;
    words.push('marklar');
    console.log(words);
    this.setState({ words: words });
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <ListOfWords words={this.state.words}></ListOfWords>
      </div>
    );
  }
};

