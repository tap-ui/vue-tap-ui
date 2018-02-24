import Button from './components/button'
const install = function (Vue,options = {}) {
  Vue.component(Button.name, Button)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  Button
}
