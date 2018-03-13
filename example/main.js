// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import tapUI from '../src/index.js'

// 消除移动端浏览器300ms延迟。
document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);

import '../src/assets/font/iconfont.css'

Vue.use(tapUI.install);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
