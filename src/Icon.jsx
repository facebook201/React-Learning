import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class RIcon extends PureComponent {
  static PropTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'icon-size'
  };
  
  render() {
    const { type, className, ...otherProps } = this.props;
    const cls = cx('ivu-icon', `ivu-icon-${type}`, className);
    return <i className={cls} {...otherProps} />;
  }
}
