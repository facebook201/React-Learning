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
};


if (ctor.prototype && ctor.prototype.isPureComponent) { // 判断组件是否继承的PureComponent
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
  );
}

function shallowEqual(objA, objB) {
  // 如果相等
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' || objA === null
    typeof objB !== 'object' || objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  // 比较两个对象属性的长度
  if (keysA.length !== keys.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}