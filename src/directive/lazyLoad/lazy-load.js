import LazyLoad from './directive'
import Vue from 'vue'

export default {
  install(Vue, options = {}) {
    const LazyClass = LazyLoad(Vue)
    const lazy = new LazyClass(options)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy),
      unbind: lazy.unbind.bind(lazy),
      componentUpdated: lazy.lazyloadHandler.bind(lazy)
    })
  }
}