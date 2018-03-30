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
    this.index = 1;
    this.selected = {};
    this.curPosY = 0; //当前位置
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

    this.scopeMaxTop = this.selectBoxTop - (this.optionHeight * (this.options.length - 1)) + this.optionHeight / 4;
    this.scopeMaxBottom = this.selectBoxTop + this.optionHeight / 4;
    console.log(this.scopeMaxTop)
    console.log(this.scopeMaxBottom)
    return this;
  }

  //设置当前的值
  setSelected(index) {
    this.selected = this.options[index];
  }

  //计算移动偏移值
  _getMoveDistance(moveEv) {
    return this.startEv.touches[0].pageY - moveEv.touches[0].pageY; //偏移值 = 起点坐标 - 移动坐标
  }

  /**
   * [onTouchStart 开始移动前的处理]
   * @param  {[TouchEvent]} ev         [touchStart的event对象]
   * @param  {[DOM]} optionsBox [option列表容器元素的dom,类名为tap-option-optionBox]
   */
  onTouchStart(ev, optionsBox) {
    this.startEv = ev;
    this.selectBoxTop = ev.target.offsetTop;
    this.presetPlace(optionsBox).calcScrope();
  }
  /**
   * @param  {[type]} moveEv [touchMove事件的event对象]
   */
  onTouchMove(moveEv) {
    let distance = this._getMoveDistance(moveEv); //获取偏移值
    if (this.curPosY - distance < this.scopeMaxTop || this.curPosY - distance > this.scopeMaxBottom) return;

    this.domOptionBox.setAttribute('style', `transform:translateY(${this.curPosY - distance}px)`); // 当前坐标 - 偏移值
    this.retPosY = this.curPosY - distance; //记录临时坐标
  }
  onTouchEnd() {
    this.curPosY = this.retPosY; //滑动结束，将临时坐标赋值给当前坐标
    this.index = this.calaIndex();

    this.setPos();
  }
  /**
   * [presetPlace 预设列表位置]
   * @param {[DOM]} dom [option列表容器元素的dom,类名为tap-option-optionBox]
   */
  presetPlace(dom) {
    if (this.isTouched) return this;
    this.domOptionBox = dom;
    this.setPos()
    this.isTouched = true;
    return this;
  }
  setPos() {
    console.log(this.index);
    let distance = this.index == 0 ?
      this.selectBoxTop + this.optionHeight / 4 :
      this.selectBoxTop - (this.index * this.optionHeight) + (this.optionHeight / 4 * (this.index));

    this.domOptionBox.setAttribute('style', `transform:translateY(${distance}px)`);

    this.curPosY = distance; //将偏移值赋值给当前坐标
  }
  calaIndex() {
    //思路是获取每个dom的top值。对比选项卡的top值。绝对值最低的那个就是当前index
    var ArrayOptionTop = []
    this.context.$slots.default.forEach((item) => {
      if (item.elm.nodeType == 1) {
        ArrayOptionTop.push(item.elm.getBoundingClientRect().top)
      }
    })

    let selectCurPos = this.domSelectInput.getBoundingClientRect().top + (this.optionHeight / 4);
    let retArr = ArrayOptionTop.map((top) => {
      return Math.abs(selectCurPos - top)
    });
    let min = Math.min.apply(Math, retArr);
    return retArr.indexOf(min);
  }



}