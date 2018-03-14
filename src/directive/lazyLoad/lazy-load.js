import LazyLoad from './directive'

import Vue from 'vue'

const install = function(Vue) {
  Vue.directive('lazy', LazyLoad);
}

LazyLoad.install = install;

export default LazyLoad
