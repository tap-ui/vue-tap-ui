import {
  throttle
} from '../../common/js/util';

import {
  autoCache
} from './decorator'

export default class Select {
  constructor(
    context,
    selectInput
  ) {
    this.context = context; //vue实例
    this.domSelectInput = selectInput; //选择框dom元素

    this.selectBoxTop = 0;
    // console.log(this.selectBoxTop);
    this.startEv = null;
    this.moveEv = null;
    this.domOptionsBox = null; //列表容器dom元素
    this.values = []; //传参集合
    this.index = 0;
    this.selected = {};
    this.curPosY = 0; //当前位置
    this.scopeMaxTop = 0;
    this.scopeMaxBottom = 0;
    this.optionHeight = 0;
    this.domOptions = [];

    this.getOptionHeight().extractOptionsValue().setSelected();
  }

  //获取option的高度
  getOptionHeight() {
    this.optionHeight = this.domSelectInput.getBoundingClientRect().height;
    return this;
  }

  //提取传入的的value，label
  extractOptionsValue() {
    this.context.$slots.default.forEach((vnode) => {
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
    return this;
  }

  //计算移动的范围
  @autoCache //缓存装饰器
  calcScrope() {
    this.scopeMaxTop = this.selectBoxTop - (this.optionHeight * (this.values.length - 1)) + this.optionHeight / 4;
    this.scopeMaxBottom = this.selectBoxTop + this.optionHeight / 4;
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
    this.domOptionsBox = optionsBox;
    this.selectBoxTop = ev.target.offsetTop;
    this.calcPos(true).calcScrope();
    this.getDomoptions()
  }
  /**
   * @param  {[type]} moveEv [touchMove事件的event对象]
   */
  onTouchMove(moveEv) {
    let distance = this._getMoveDistance(moveEv); //获取偏移值
    if (this.curPosY - distance < this.scopeMaxTop || this.curPosY - distance > this.scopeMaxBottom) return; //

    this.domOptionsBox.setAttribute('style', `transform: translate3d(0, 0, 0) translateY(${this.curPosY - distance}px)`); // 当前坐标 - 偏移值
    this.retPosY = this.curPosY - distance; //记录临时坐标
    this.higtLight();
  }

  onTouchEnd() {
    this.curPosY = this.retPosY; //滑动结束，将临时坐标赋值给当前坐标
    this.index = this.calcIndex();
    // this.domOptionsBox.setAttribute('style', 'transition:transform .1s');
    this.calcPos(false);
    this.setSelected();
    this.domOptions.length = 0;
    return Promise.resolve(200);
  }

  /**
   * [calcPos 计算坐标]
   * @param  {Boolean} isPreset [是不是预设]
   * @return {[Select]}           [返回Select当前对象，用于链式调用]
   */
  calcPos(isPreset) {
    // console.log(this.domSelectInput.offsetTop);
    // console.log('index:' + this.index);
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
    // console.log(distance);
    isPreset ? this.domOptionsBox.setAttribute('style', `transform:translateY(${distance}px)`) :
      this.domOptionsBox.setAttribute('style', `transition: transform .2s; transform:translateY(${distance}px)`);
    this.curPosY = distance; //将偏移值赋值给当前坐标
  }
  //根据位置计算当前的index
  calcIndex() {
    //思路:获取每个option的top值。与select的位置相减，绝对值越小意味着与select越近
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
  getDomoptions() {
    this.context.$slots.default.forEach((item) => {
      if (item.tag == 'option') {
        this.domOptions.push(item.elm);
      }
    });
    // console.log(this.domOptions);
  }
  higtLight() {
    this.index = this.calcIndex();
    console.log(this.domOptions[this.index].style)
    this.domOptions[this.index].style.transform = 'scale(1.2)';
    console.log(this.index);
    this.lastIndex = this.calcIndex()
  }


}