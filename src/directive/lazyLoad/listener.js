export default class ReactiveListener {
  constructor({
    el,
    src,
    error,
    loading,
    options
  }) {
    this.el = el; //目标元素
    this.src = src; //目标图片路径
    this.loading = loading; //loading占位图
    this.error = error; //图片请求错误占位图

    this.options = options; //参数
    this.rect = null;

    this.state = {
      error: false, //出错
      loaded: false, //加载中
      rendered: false //已渲染
    }
  }

  /**
   * [获取目标dom 相对于视图的位置]
   */
  _getRect() {
    this.rect = this.el.getBoundingClientRect();
  }

  /**
   * [判断目标dom是否进入可视区域]
   * @return {Boolean} [元素是否进入可是区域]
   */
  isView() {
    this._getRect();
    return (this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoad) &&
          (this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0)
  }

  load() {
    this.loadImageAsync().then((oImg)=> {

      this.el.src = oImg.src;
      this.state.rendered = true;
      console.log(this)
    }).catch((err)=> {
      this.state.error = true;
    })

  }


  loadImageAsync() {
      return new Promise((resolve, reject)=>{
          let oImg = new Image();
          oImg.src = this.src;

          oImg.onload = () => {
            this.state.loaded = true;
            return resolve(oImg)
          }
          oImg.reject = () => {
            return reject(oImg)
          }
      })
  }
}
