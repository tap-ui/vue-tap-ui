/**
 * [description]
 * @param  {Function} fn       [需要被延迟执行的函数]
 * @param  {[Number]} interval [时间间隔]
 * @return {[Function]}        [被绑定延迟执行的函数]
 */
const throttle = function(fn, interval = 500) {
  let _self = fn, //保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true;

  return function() {
    var args = arguments;

    if (firstTime) { //如果是第一次调用，不需要延迟执行
      _self.apply(this, args);
      return firstTime = false;
    }

    if (timer) { //如果定时器还在，说明前一次延迟执行还没有完成
      return false;
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      _self.apply(this, args);
    }, interval)
  }
}

/**
 * [兼容的事件绑定函数， 懒加载]
 * @param  {[dom]}   el   [需要绑定是dom元素]
 * @param  {[string]}   type [绑定的类型， 例如click]
 * @param  {Function} fn   [需要绑定的函数]
 */
let addEvent = function(el, type, fn) {
  console.log(fn)
  if(window.addEventListener) {
    addEvent = function(el, type, fn){
        el.addEventListener(type, fn, false)
    }
  }else if(addEvent) {
    addEvent = function(el, type, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
  addEvent(el, type, fn)
}

export {
  throttle
}
