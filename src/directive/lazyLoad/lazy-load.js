import LazyLoad from './directive'
import Vue from 'vue'

export default {
  install(Vue, options = {}) {
    const LazyClass = LazyLoad(Vue)
    const lazy = new LazyClass(options) //将参数传入lazy对象中

    Vue.directive('lazy', { //我们命名指令为 v-lazy
      bind: lazy.add.bind(lazy),
      componentUpdated: lazy.lazyloadHandler.bind(lazy)
    })
  }
}