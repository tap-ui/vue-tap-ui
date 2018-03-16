import util from '../../common/js/util'

//默认的占位图， 1px的base图片
const DEFAULT_URL = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

export default function(Vue) {
  return class Lazy {
    //构造函数， 预设一些值
    constructor({
      loading = DEFAULT_URL,
      error = DEFAULT_URL,
      throttleWait = 200
    }) {

      this.ListenerQueue = [];
      this.options = {
        loading: loading,
        error: error,
        throttleWait
      }
    }

    _lazyloadHandler() {

    }









    add(el, binding, vnode) {
      // console.log('bind')
      // console.log(this.options);
      let _this = this;
      window.addEventListener('scroll', util.throttle(
        this.setSrc.bind(this, el, binding),
        this.throttleWait))
    }

    unbind(el, binding, vnode) {

    }

    setSrc(el, binding) {
      let src = binding.value;
      let seeHeight = window.innerHeight;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (el.offsetTop < seeHeight + scrollTop) {
        el.src = this.options.loading;
        console.log('11')
        let oImg = new Image();
        oImg.src = src;
        let _this = this;
        oImg.onload = function() {
          el.src = oImg.src
        }
      }
    }
  }
}