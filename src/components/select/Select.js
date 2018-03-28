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

    this.getOptionHeight().calcScrope();
    console.log(this.optionBox.getBoundingClientRect());
  }

  _getMoveDistance(moveEv) {
    return this.startEv.touches[0].pageY - moveEv.touches[0].pageY;
  }

  getOptionHeight() {
    this.optionHeight = this.optionBox.children[0].getBoundingClientRect().height;
    return this;
  }

  /**
   * [boxMove 选项列表跟随拇指滑动，在touchMove的watch中调用，并传入event对象]
   * @param  {[type]} moveEv [touchMove事件的event对象]
   * @return {[type]}        [description]
   */
  boxMove(moveEv) {
    let distance = this._getMoveDistance(moveEv);
    // console.log(distance);
    console.log(this.selectBoxTop);
    console.log('top: '+ this.scopeMaxTop);
    console.log('bottom: '+ this.scopeMaxBottom);
    if(distance > this.scopeMaxTop || distance < this.scopeMaxBottom) return;
    this.optionBox.setAttribute('style', `transform:translateY(${-distance}px)`)
  }

  calcScrope() {
    //offsetTop -
    this.scopeMaxTop = this.selectBoxTop + (this.optionHeight / 2);
    this.scopeMaxBottom =  this.selectBoxTop - this.optionBox.getBoundingClientRect().height;
  }


}
