import {
  decoratorify,
  throttle,
  addEvent
} from '../../common/js/util'
import ReactiveListener from './listener'
//默认的占位图， 1px的base64图片
const DEFAULT_URL = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

export default function(Vue) {
  return class Lazy {
    //构造函数， 预设一些值
    constructor({
      loading = DEFAULT_URL, //加载中占位图
      error = DEFAULT_URL, //加载失败占位图
      throttleWait = 200, //节流处理的时间阈值， 默认200毫秒，即1秒钟最多执行5次
      preLoad = 1.3, //距离阈值，1.3倍
      retry = 3, //加载出错时，自动重试的次数
      retryInterval = 1000 //加载出错时，自动重试的时间间隔
    }) {
      this.ListenerQueue = []; //监听队列
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

    //指令第一次绑定到元素时， 将el传入ReactiveListener 类中。并推入监听队列
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
      this.preProcess(); //预防图片本来就在可视区域，先执行一遍lazyloadHandler
    }

    //绑定事件
    bindScroll() {
      let _this = this;
      window.addEventListener('scroll', _this.lazyloadHandler);
      return this;
    }

    //图片加载
    // @decoratorify(throttle, 200)
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
      Vue.nextTick(() => {
        this.lazyloadHandler();
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
      this.ListenerQueue[deleteIndex].destroy();
      this.ListenerQueue.splice(deleteIndex, 1);
    }
  }
}