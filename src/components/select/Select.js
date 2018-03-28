export default class Select {
  constructor(
    context,
    optionBox,
    startEv,
    moveEv,
    selectBoxTop
  ) {
    this.context = context;
    this.optionBox = optionBox;
    this.startEv = startEv;
    this.moveEv = moveEv;
    this.selectBoxTop = selectBoxTop;

    this.options = []; //传参集合
    this.index = 1;
    this.scopeMaxTop = 0;
    this.scopeMaxBottom = 0;
    this.optionHeight = 0;

    this.getOptionHeight().calcScrope().extractOptions().presetPlace();
    console.log(this.context.$slots.default);
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
    console.log('top: ' + this.scopeMaxTop);
    console.log('bottom: ' + this.scopeMaxBottom);
    if (distance > this.scopeMaxTop || distance < this.scopeMaxBottom) return;
    this.optionBox.setAttribute('style', `transform:translateY(${-distance}px)`)
  }

  calcScrope() {
    //offsetTop -
    this.scopeMaxTop = this.selectBoxTop + (this.optionHeight / 2);
    this.scopeMaxBottom = this.selectBoxTop - this.optionBox.getBoundingClientRect().height;
    return this;
  }

  //提取参数
  extractOptions() {
    this.context.$slots.default.forEach((vnode) => {
      if (vnode.tag !== 'option') return;
      if (!vnode.data) {
        throw new Error(`<option>of value is required`);
        return;
      }
      this.options.push({
        label: vnode.children[0].text,
        value: vnode.data.domProps.value,
        dom: vnode.elm
      })
    })
    return this;
  }

  //预设位置
  presetPlace() {
    let distance = this.selectBoxTop - (this.index * this.optionHeight) + (this.optionHeight / 4 * this.index)
    this.optionBox.setAttribute('style', `transform:translateY(${distance}px)`)
  }




}