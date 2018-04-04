export default class HighLight {
  constructor(className) {
    this.className = className; //类名
    this.domHighLighted = null; //记录上一个dom
  }
  addClass(dom) {
    if (dom.nodeType == 1) {
      setTimeout(() => {
        dom.classList.add(this.className)
      }, 0)
    }
    if (this.domHighLighted) {
      this.remove();
    }
    this.domHighLighted = dom;
  }
  remove() {
    if (this.domHighLighted) {
      this.domHighLighted.classList.remove(this.className);
    }
  }
}