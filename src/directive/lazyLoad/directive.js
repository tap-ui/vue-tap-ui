import {throttle, addEvent} from '../../common/js/util'
import ReactiveListener from './listener'
//默认的占位图， 1px的base图片
const DEFAULT_URL = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

export default function(Vue) {
  return class Lazy {
    //构造函数， 预设一些值
    constructor({
      loading = DEFAULT_URL,
      error = DEFAULT_URL,
      throttleWait = 200,
      preLoad = 1.3
    }) {

      this.ListenerQueue = [];
      this.options = {
        loading: loading,
        error: error,
        throttleWait,
        preLoad
      }

      //函数节流处理
      this.lazyloadHandler = throttle(this._lazyloadHandler.bind(this), this.options.throttleWait);

      Vue.nextTick(()=> {
        this._lazyloadHandler()
      })

      this.bindScroll();
      // this.init(Vue);
    }
    add(el, binding, vnode) {
      let newlistener = new ReactiveListener({
        el,
        src: binding.value,
        bindType: binding.arg,
        error: this.options.error,
        loading: this.options.loading,
        options: this.options
      })

      this.ListenerQueue.push(newlistener);
      this.init();
    }
    unbind(el, binding, vnode) {

    }

    bindScroll(el) {
      let _this = this;

      // addEvent(el,'scroll', _this.lazyloadHandler);
      window.addEventListener('scroll', this.lazyloadHandler)
      return this;
    }

    _lazyloadHandler() {
        let isView = false;
        this.ListenerQueue.forEach((listener, index) => {
          // console.log(listener)
          if(listener.state.loaded) return;
          isView = listener.isView();
          if(!isView) return;
          listener.load();
        })
    }

    //如果图片一开始默认在可视区域
    init() {
      this._lazyloadHandler();
      Vue.nextTick(()=> {
        this._lazyloadHandler();
      })
    }
    // setSrc(el, binding) {
    //   let src = binding.value;
    //   let seeHeight = window.innerHeight;
    //   let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //   if (el.offsetTop < seeHeight + scrollTop) {
    //     el.src = this.options.loading;
    //     console.log('11')
    //     let oImg = new Image();
    //     oImg.src = src;
    //     let _this = this;
    //     oImg.onload = function() {
    //       el.src = oImg.src
    //     }
    //   }
    // }
  }
}
