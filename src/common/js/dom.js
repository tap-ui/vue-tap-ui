let domFind = function(container, targetClass) {
  for (let i = 0, len = container.length; i < len; i++) {
    if (container[i].nodeType == 1) {
      if (container[i].classList.contains(targetClass)) {
        return container[i];
      }
    }
  }
};
class classToggle {
  constructor(className) {
    this.className = className; //类名
    this.domHighLighted = null; //上一个记录的dom
  }
  addClass(dom) {
    if (dom.nodeType == 1) {
      setTimeout(() => {
        dom.classList.add(this.className)
      }, 0)
    }
    if (this.domHighLighted) {
      this.remove(); //removeClass上一个dom
    }
    this.domHighLighted = dom; //记录当前dom
  }
  remove(dom) {
    if (dom) {
      if (dom.nodeType == 1) {
        dom.classList.remove(this.className)
      }
    } else if (this.domHighLighted) {
      this.domHighLighted.classList.remove(this.className);
    }
  }
}

export {
  domFind,
  classToggle
}