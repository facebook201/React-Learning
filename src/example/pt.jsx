import React from 'react';
import PropTypes from 'prop-types';

export default class Pt extends React.Component {

  static propTypes = {
    name: PropTypes.string
  };

  render() {
    const {
      name
    } = this.props;
    console.log(this.props, typeof this.props.name);
    return (
      <h1>{this.props.name}</h1>
    );
  }
};

