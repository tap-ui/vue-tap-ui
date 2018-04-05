export default class HighLight {
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
  remove() {
    if (this.domHighLighted) {
      this.domHighLighted.classList.remove(this.className);
    }
  }
}