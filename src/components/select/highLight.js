import postal from 'postal'

function publish(topic, channel) {
  const channelName = channel || '/';
  const msgChannel = postal.channel(channelName);
  msgChannel.subscribe(topic, callback => {
    console.log(typeof v);
    if (typeof callback == 'function') {
      callback();
    }
  });
  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      msgChannel.publish(topic, value);
    };
  };
}

export default class HighLight {
  constructor(className) {
    this.className = className;
    this.domHighLighted = null;
  }

  addClass(dom) {

    if (dom.nodeType == 1) {
      dom.classList.add(this.className)
    }
    if (this.domHighLighted) {
      this.remove();
    }
    this.domHighLighted = dom;
  }
  setLastDom(dom) {
    console.log(dom);
    this.domHighLighted = dom;
  }
  remove() {
    if (this.domHighLighted) {
      this.domHighLighted.classList.remove(this.className);
    }
  }
}