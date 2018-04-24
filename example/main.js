// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import tapUI from '../src/index.js'

// 消除移动端浏览器300ms延迟。 疑似引入导致select组件bug，
// document.addEventListener('DOMContentLoaded', function() {
//   if (window.FastClick) window.FastClick.attach(document.body);
// }, false);

import '../src/assets/font/iconfont.css'
//注册组件， 并给懒加载组件传值
Vue.use(tapUI, {
  lazy: {
    loading: require('./assets/loading.jpg'),
    error: require('./assets/error.jpg')
  }
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})