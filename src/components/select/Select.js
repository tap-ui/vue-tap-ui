export default class Select {
  constructor(
    context,
    selectInput,
    selectBoxTop
  ) {
    this.context = context; //vue实例
    this.domSelectInput = selectInput; //选择框dom元素

    this.startEv = null;
    this.moveEv = null;
    this.selectBoxTop = selectBoxTop;

    this.domOptionBox = null;
    this.options = []; //传参集合
    this.index = 0;
    this.selected = {};
    this.curPos = 0; //当前位置
    this.scopeMaxTop = 0;
    this.scopeMaxBottom = 0;
    this.optionHeight = 0;
    this.getOptionHeight().extractOptions().setSelected(this.index);
  }

  //获取option的高度
  getOptionHeight() {
    this.optionHeight = this.domSelectInput.getBoundingClientRect().height;
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
        value: vnode.data.domProps.value
      })
    })
    return this;
  }

  //计算移动的范围
  calcScrope() {
    if (this.scopeMaxTop !== 0 && this.scopeMaxBottom !== 0) return;

    this.scopeMaxTop = this.selectBoxTop + (this.optionHeight / 4);
    this.scopeMaxBottom = this.selectBoxTop - (this.optionHeight / 4 * this.options.length)
    // console.log(this.scopeMaxTop)
    // console.log(this.scopeMaxBottom)
    return this;
  }

  //设置当前的值
  setSelected(index) {
    this.selected = this.options[index];
  }

  //计算移动距离
  _getMoveDistance(moveEv) {

    // console.log(moveEv.touches[0].pageY);
    // console.log(this.startEv.touches[0].pageY - moveEv.touches[0].pageY);
    // return this.startEv.touches[0].pageY - moveEv.touches[0].pageY;
    return this.curPos - moveEv.touches[0].pageY;
  }



  /**
   * [boxMove 选项列表跟随拇指滑动，在touchMove的watch中调用，并传入event对象]
   * @param  {[type]} moveEv [touchMove事件的event对象]
   */
  boxMove(moveEv) {
    let distance = this._getMoveDistance(moveEv);
    // if (distance > this.scopeMaxTop || distance < this.scopeMaxBottom) return;
    this.domOptionBox.setAttribute('style', `transform:translateY(${-distance}px)`);
    this.curPos = distance;
  }

  //预设位置
  presetPlace(dom) {

    if (this.isTouched) return this;
    let distance = this.index == 0 ?
      this.selectBoxTop + this.optionHeight / 4 :
      this.selectBoxTop - (this.index * this.optionHeight) + (this.optionHeight / 4 * (this.index))
    dom.setAttribute('style', `transform:translateY(${distance}px)`);
    this.domOptionBox = dom;
    this.curPos = distance;
    console.log(this.startEv.touches[0]);
    this.isTouched = true;
    return this;
  }

  //设置选择框位置
  setRangeTop() {
    console.log(this.optionBox)
  }


}