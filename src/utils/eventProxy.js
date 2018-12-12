'use strict';

const eventProxy = {
  ret: [],
  eventKeys: [],
  on(eventName, fn) {
    if (eventName) {
      if (!this.eventKeys.includes(eventName)) {
        this.eventKeys.push(eventName);
        this.ret.push({
          key: eventName,
          callback: fn
        });
      }
    }
  },
  // 触发
  trigger(eventName, value) {
    if (eventName && this.eventKeys.includes(eventName)) {
      const ret = this.ret.filter(ele => {
        return ele.key === eventName;
      });
      ret[0].callback(value);
    }
  }
};

export default eventProxy;