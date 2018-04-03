import postal from 'postal'

function publish(topic, channel) {
  const channelName = channel || '/';
  const msgChannel = postal.channel(channelName);
  msgChannel.subscribe(topic, callback => {
    if (typeof v == 'function') {
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
  @publish('addClass', 'highLight')
  addClass(dom) {
    if (dom.nodeType == 1) {
      dom.classList.add(this.className)
    }
    if (this.domHighLighted) {
      //将
      return this.remove.bind(this)
      this.remove()
    }
  }
  setLastDom(dom) {
    this.domHighLighted = dom;
  }
  remove() {
    if (this.domHighLighted) {
      this.domHighLighted.classList.remove(this.className);
    }
  }
}