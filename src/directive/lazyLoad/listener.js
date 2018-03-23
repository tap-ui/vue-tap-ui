export default class ReactiveListener {
  constructor({
    el,
    src,
    loading,
    error,
    bindType,
    retry,
    options
  }) {
    this.el = el; //目标元素
    this.src = src; //目标图片路径
    this.loading = loading; //loading占位图
    this.error = error; //图片请求错误占位图
    this.bindType = bindType, //绑定类型，img / background-image
      this.retry = retry, //图片加载失败，重试次数
      this.options = options; //参数
    this.rect = null; //图片位置
    this.isBGType = false //是否为背景图片

    this.state = {
      error: false, //出错
      loaded: false, //加载中
      rendered: false //已渲染
    }

    this.checkBindTypeBackground(); //检查是否为背景图片
  }


  // [获取目标dom 相对于视图的位置]
  _getRect() {
    this.rect = this.el.getBoundingClientRect();
  }

  //检查是否为背景图片
  checkBindTypeBackground() {
    this.isBGType = (this.bindType == 'bg' || this.bindType == 'background') ? true : false
  }

  /**
   * [判断目标dom是否进入可视区域]
   * @return {Boolean} [元素是否进入可视区域]
   */
  isView() {
    this._getRect();
    return (this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoad) &&
      (this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0)
  }

  //加载图片的处理函数
  load() {
    this.placeholder(); //设置图片占位图

    return this.loadImageAsync().then((oImg) => {
      return this.isBGType ? this.setBackground(oImg) : this.setImgSrc(oImg);
    }).catch((err) => {
      this.state.error = true;
      return Promise.reject()
    })
  }

  //重试重新加载
  toTryLoad() {
    console.log(`tapLazyload log: ${this.src} tried too more than ${this.retry} times`)
    this.retry--;
    setTimeout(() => {
      console.log('再次尝试');
      this.load();
    }, 1000)
  }

  //尝试重新请求后，最终加载失败
  finallyError() {
    this.state.error = true;
    this.errorPlaceholder();
  }

  //图片异步加载
  loadImageAsync() {
    return new Promise((resolve, reject) => {
      let oImg = new Image();
      oImg.src = this.src;
      oImg.onload = () => {
        this.state.loaded = true;
        this.state.error = false;
        resolve(oImg)
      }
      oImg.onerror = (err) => {
        reject(err)
      }
    })
  }

  //设置img的src
  setImgSrc(oImg) {
    this.el.src = oImg.src;
    this.state.rendered = true;
    return Promise.resolve()
  }

  //设置背景图片
  setBackground(oImg) {
    this.el.setAttribute('style', `background-image:url(${oImg.src})`)
    this.state.rendered = true;
    return Promise.resolve()
  }

  //设置图片加载时的占位图
  placeholder() {
    this.isBGType ?
      this.el.setAttribute('style', `background-image:url(${this.loading})`) :
      this.el.src = this.loading;
  }

  //加载错误时的图片占位图
  errorPlaceholder() {
    console.log('最终失败');
    console.log(this.error);
    this.isBGType ?
      this.el.setAttribute('style', `background-image:url(${this.error})`) :
      this.el.src = this.error;
  }

  destroy() {
    this.el = null;
    this.src = null;
    this.error = null;
    this.loading = null;
  }
}