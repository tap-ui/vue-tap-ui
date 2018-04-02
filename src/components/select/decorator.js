/**
 * [autoCache 使用单例模式实现的缓存装饰器]
 * @param  {[Object]} target     [类的原始对象]
 * @param  {[String]} name       [方法的名字]
 * @param  {[Object]} descriptor [描述对象]
 * @return {[Object]}            [修饰过的描述对象]
 */
function autoCache(target, name, descriptor) {
  var oldValue = descriptor.value;
  let cache = null;
  console.log(typeof descriptor);
  descriptor.value = function(...args) {
    if (cache) {
      return cache;
    } else {
      cache = oldValue.apply(this || {}, args);
      return cache;
    }
  }
  return descriptor;
}

export {
  autoCache
}