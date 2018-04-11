import Button from './components/button';
import Badge from './components/badge';
import Toast from './components/toast';
import Header from './components/header';
import Select from './components/select'
import { Tab, TabItem } from './components/tab'
import { Swipe, SwipeItem } from './components/swipe';
import LazyLoad from './directive/lazyLoad';

const install = function(Vue, options = {}) {
  let { lazy } = options;

  Vue.component(Button.name, Button);
  Vue.component(Badge.name, Badge);
  Vue.component(Toast.name, Toast);
  Vue.component(Header.name, Header);
  Vue.component(Select.name, Select);
  Vue.use(LazyLoad, lazy ? lazy : {});
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Tab.name, Tab);
  Vue.component(TabItem.name, TabItem);
}

// // auto install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// };

export default {
  install,
  Button,
  Badge,
  Toast,
  Header,
  LazyLoad,
  Select,
  Swipe,
  SwipeItem,
  Tab,
  TabItem
}