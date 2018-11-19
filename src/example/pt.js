import React from 'react';
import PropTypes from 'prop-types';

export default class Pt extends React.Component {
  static propTypes = {
    type: PropTypes.string
  };

  render() {
    return (
      <h1> { this.props.name } </h1>
    )
  };
};
