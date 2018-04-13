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

/**
 * [domIndex 获取dom相对于父组件的index值]
 * @param  {[type]} dom [description]
 * @return {[type]}     [description]
 */
function domIndex(dom) {
  let self = dom;
  let parent = dom.parentNode;
  let doms = Array.from(parent.childNodes).filter(dom => dom.nodeType == 1);
  var index = 0;
  doms.some((dom, _index) => {
    if (dom == self) {
      index = _index;
      return;
    }
  })
  return index;
}
export {
  domFind,
  classToggle,
  domIndex
}