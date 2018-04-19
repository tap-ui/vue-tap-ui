const decoratorify = function(fn, ...rest) {
  return function(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = fn.call(fn, oldValue, ...rest);
    return descriptor
  }
}

/**
 * [description]
 * @param  {Function} fn       [需要被延迟执行的函数]
 * @param  {[Number]} interval [时间间隔]
 * @return {[Function]}        [被绑定延迟执行的函数]
 */
const throttle = function(fn, throttleWait) {
  let _self = fn, //保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true;
  return function() {
    var args = arguments;
    var that = this
    if (firstTime) { //如果是第一次调用，不需要延迟执行
      _self.apply(that, args);
      return firstTime = false;
    }

    if (timer) { //如果定时器还在，说明前一次延迟执行还没有完成
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(that, args);
    }, throttleWait.interval)
  }
}

/**
 * [兼容的事件绑定函数， 懒加载]
 * @param  {[dom]}   el   [需要绑定是dom元素]
 * @param  {[string]}   type [绑定的类型， 例如click]
 * @param  {Function} fn   [需要绑定的函数]
 */
let addEvent = function(el, type, fn, capture = false) {
  console.log(el)
  if (window.addEventListener) {
    addEvent = function(el, type, fn) {
      el.addEventListener(type, fn, capture)
    }
  } else if (addEvent) {
    addEvent = function(el, type, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
  addEvent(el, type, fn)
}


const isObj = (x) => {
  const type = typeof x
  return x !== null && (type === 'object' || type == 'function')
}

export {
  decoratorify,
  throttle,
  addEvent,
  isObj
}
