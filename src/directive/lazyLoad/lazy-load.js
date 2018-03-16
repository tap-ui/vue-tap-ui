import LazyLoad from './directive'

import Vue from 'vue'

// const install = function(Vue, options = {}) {
//
//
// console.log(lazy)
//   Vue.directive('lazy', {
//     bind: lazy.add,
//     undind: lazy.unbind
//   });
// }

// LazyLoad.install = install;

export default {
  install(Vue, options = {}) {
    const LazyClass = LazyLoad(Vue)
    const lazy = new LazyClass(options)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy),
      unbind: lazy.unbind.bind(lazy)
    })
  }
}