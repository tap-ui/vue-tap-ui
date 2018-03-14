import Button from './components/button';
import Badge from './components/badge';
import Toast from './components/toast';
import Header from './components/header';
import LazyLoad from './directive/lazyLoad'

const install = function (Vue, options = {}) {
  Vue.component(Button.name, Button);
  Vue.component(Badge.name, Badge);
  Vue.component(Toast.name, Toast);
  Vue.component(Header.name, Header);
  Vue.use(LazyLoad)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  install,
  Button,
  Badge,
  Toast,
  LazyLoad
}
