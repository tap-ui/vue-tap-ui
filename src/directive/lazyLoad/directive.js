import {
  throttle,
  addEvent
} from '../../common/js/util'
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
      preLoad = 1.3,
      retry = 3,
      retryInterval = 1000
    }) {

      this.ListenerQueue = [];
      this.options = {
        loading: loading,
        error: error,
        throttleWait,
        preLoad,
        retry: parseInt(retry),
        retryInterval
      }

      //函数节流处理
      this.lazyloadHandler = throttle(this._lazyloadHandler.bind(this), this.options.throttleWait);
      this.bindScroll();
    }

    add(el, binding, vnode) {
      let newlistener = new ReactiveListener({
        el,
        src: binding.value,
        bindType: binding.arg,
        error: this.options.error,
        loading: this.options.loading,
        retry: this.options.retry,
        options: this.options
      })

      this.ListenerQueue.push(newlistener);
      this.preProcess();
    }
    unbind(el, binding, vnode) {

    }

    bindScroll(el) {
      let _this = this;
      window.addEventListener('scroll', this.lazyloadHandler)
      return this;
    }

    //图片加载
    _lazyloadHandler() {
      let isView = false;
      if (!this.ListenerQueue.length) return;
      this.ListenerQueue.forEach((listener, index) => {
        if (listener.state.loaded) return;
        isView = listener.isView();
        if (!isView) return;
        listener.load()
          .then(() => {
            this.remove(listener, index);
          })
          .catch((err) => {
            this.toTryLoad(listener, index);
          });
      })
    }

    //图片出错时尝试重新加载
    toTryLoad(ReactiveListener, index) {
      if (ReactiveListener.retry) {
        ReactiveListener.toTryLoad();
      } else {
        ReactiveListener.finallyError();
        this.remove(ReactiveListener, index);
      }
    }

    //如果图片一开始默认在可视区域
    preProcess() {
      this._lazyloadHandler();
      Vue.nextTick(() => {
        this._lazyloadHandler();
      })
    }

    /**
     * [加载完毕，将对应ReactiveListener对象从ListenerQueue数组中移除]
     * @param  {[type]} ReactiveListener [description]
     * @param  {[type]} i                [ReactiveListener 所在数组中的索引， 防止2张图片相同导致误删]
     */
    remove(RenderedListener, i) {
      let deleteIndex = this.ListenerQueue.findIndex((listen, index) => {
        return listen.el == RenderedListener.el && index == i;
      });
      if (deleteIndex == -1) return; //findIndex 找不到对应元素，会返回-1

      this.ListenerQueue.splice(deleteIndex, 1);
    }
  }
}