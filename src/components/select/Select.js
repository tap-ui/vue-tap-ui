export default class Select {
  constructor(
    optionBox,
    startEv,
    moveEv,
    selectBoxTop
  ) {

    this.optionBox = optionBox;
    this.startEv = startEv;
    this.moveEv = moveEv;
    this.selectBoxTop = selectBoxTop;
    this.scopeMaxTop = 0;
    this.scopeMaxBottom = 0;
    this.optionHeight = 0;

    this.getOptionHeight();
    console.log(this.startEv);
    console.log(this.moveEv);
  }

  _getMoveDistance(moveEv) {
    return this.startEv.touches[0].pageY - moveEv.touches[0].pageY;
  }

  getOptionHeight() {
    this.optionHeight = this.optionBox.children[0].getBoundingClientRect().height;
  }

  /**
   * [boxMove 选项列表跟随拇指滑动，在touchMove的watch中调用，并传入event对象]
   * @param  {[type]} moveEv [touchMove事件的event对象]
   * @return {[type]}        [description]
   */
  boxMove(moveEv) {
    console.log('移动了');
    let distance = this._getMoveDistance(moveEv);
    this.optionBox.setAttribute('style', `transform:translateY(${-distance}px)`)
  }

  calcScrope() {
    // this.scopeMaxTop = this.selectBoxTop +
  }

  move
}