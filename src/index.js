import Button from './components/button'
import Badge from './components/badge'
const install = function (Vue,options = {}) {
  Vue.component(Button.name, Button)
  Vue.component(Badge.name, Badge)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default  {
  install,
  Button,
  Badge
}
