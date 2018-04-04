import HighLight from './highLight'
export default class Select {
  constructor(
    ctx,
    selectInput
  ) {
    this.ctx = ctx; //vue实例
    this.domSelectInput = selectInput; //选择框dom元素

    this.selectBoxTop = 0;
    this.domOpsBox = null; //列表容器dom元素
    this.values = []; //外部传入的value
    this.index = 0; //当前选中数据的index,相对于values
    this.selected = {}; //当前选中数据
    this.curPosY = 0; //当前位置
    this.scopeMaxTop = 0; //偏移上限
    this.scopeMaxBottom = 0; //偏移下限
    this.optionHeight = 0;
    this.domOps = []; //option的dom集合

    this.getOptionHeight().extractValue().setSelected();
  }

  //获取option的高度
  getOptionHeight() {
    this.optionHeight = this.domSelectInput.getBoundingClientRect().height;
    return this;
  }

  //提取传入的的value，label
  extractValue() {
    this.ctx.$slots.default.forEach((vnode) => {
      if (vnode.tag !== 'option') return;
      if (!vnode.data) {
        throw new Error(`<option>of value is required`);
        return;
      }
      this.values.push({
        label: vnode.children[0].text,
        value: vnode.data.domProps.value
      })
    })
    // this.emitOptionNumber();
    return this;
  }
  //获取参数数量，并向上传递
  getOptionNumber() {
    return this.values.length;
  }
  //计算移动的范围
  // @autoCache //缓存装饰器
  calcScrope() {
    if (this.iscacled) return;
    this.scopeMaxTop = this.selectBoxTop - (this.optionHeight * (this.values.length - 1)) + this.optionHeight / 4;
    this.scopeMaxBottom = this.selectBoxTop + this.optionHeight / 4;
    this.iscacled = true;
    return this;
  }

  //设置当前的值
  setSelected() {
    this.selected = this.values[this.index];
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
    this.domOpsBox = optionsBox;
    this.selectBoxTop = ev.target.offsetTop;
    this.calcPos(true).calcScrope();
    this.getdomOps();
    this.higtLight(true);
  }
  /**
   * @param  {[type]} moveEv [touchMove事件的event对象]
   */
  onTouchMove(moveEv) {
    let distance = this._getMoveDistance(moveEv); //获取偏移值
    if (this.curPosY - distance < this.scopeMaxTop || this.curPosY - distance > this.scopeMaxBottom) return; //

    this.domOpsBox.setAttribute('style', `transform: translate3d(0, 0, 0) translateY(${this.curPosY - distance}px)`); // 当前坐标 - 偏移值
    this.retPosY = this.curPosY - distance; //记录临时坐标
    this.higtLight();
  }

  onTouchEnd() {
    this.curPosY = this.retPosY; //滑动结束，将临时坐标赋值给当前坐标
    this.index = this.calcIndex();
    this.calcPos(false);
    this.setSelected();
    this.domOps.length = 0; //清空options dom数组
    this.oHighLight = null;
    return Promise.resolve(200);
  }

  /**
   * [calcPos 计算坐标]
   * @param  {Boolean} isPreset [是不是预设]
   * @return {[Select]}           [返回Select当前对象，用于链式调用]
   */
  calcPos(isPreset) {
    let selectInputTop = this.domSelectInput.offsetTop;
    let distance = this.index == 0 ?
      selectInputTop :
      selectInputTop - (this.index * this.optionHeight);
    this.setPos(distance, isPreset);
    return this;
  }
  /**
   * [setPos description]
   * @param {[Number]}  distance [description]
   * @param {Boolean} isPreset [是不是预设]
   */
  setPos(distance, isPreset) {
    isPreset ? this.domOpsBox.setAttribute('style', `will-change: transform; transform:translateY(${distance}px)`) :
      this.domOpsBox.setAttribute('style', `will-change: transform; transition: transform .2s; transform:translateY(${distance}px)`);
    this.curPosY = distance; //将偏移值赋值给当前坐标
  }
  //根据位置计算当前的index
  calcIndex() {
    //思路:获取每个option的top值。与select的位置相减，绝对值越小意味着与select越近
    let ArrayOptionTop = [];
    Array.from(this.domOpsBox.children).forEach((item) => {
      if (item.nodeType == 1) {
        ArrayOptionTop.push(item.getBoundingClientRect().top)
      }
    })

    let selectCurPos = this.domSelectInput.getBoundingClientRect().top + (this.optionHeight / 4);
    let retArr = ArrayOptionTop.map((top) => {
      return Math.abs(selectCurPos - top)
    });
    let min = Math.min.apply(Math, retArr);
    return retArr.indexOf(min);
  }
  //拿到每个options的dom元素
  getdomOps() {
    this.ctx.$slots.default.forEach((item) => {
      if (item.tag == 'option') {
        this.domOps.push(item.elm);
      }
    });
  }
  //高亮
  higtLight(isStart) {
    this.index = this.calcIndex();

    if (isStart || this.lastIndex == this.index) return;
    if (!this.oHighLight) {
      this.oHighLight = new HighLight('tap-option-optionBox--highLight');
    }
    this.oHighLight.addClass(this.domOps[this.index])
    this.lastIndex = this.index;


  }
}