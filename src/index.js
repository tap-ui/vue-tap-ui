import Button from './components/button';
import Badge from './components/badge';
import Header from './components/header';
import {Collapse, Panel} from './components/collapse';

import {VueToast} from './components/toast';

import Select from './components/select'
import { Tab, TabPane } from './components/tab'
import { Swipe, SwipeItem } from './components/swipe';
import LazyLoad from './directive/lazyLoad';

const install = function(Vue, options = {}) {
  let { lazy } = options;

  Vue.component(Button.name, Button);
  Vue.component(Collapse.name, Collapse);
  Vue.component(Panel.name, Panel);
  Vue.component(Badge.name, Badge);
  Vue.component(VueToast.name, VueToast);
  Vue.component(Header.name, Header);
  Vue.component(Select.name, Select);
  Vue.use(LazyLoad, lazy ? lazy : {});
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Tab.name, Tab);
  Vue.component(TabPane.name, TabPane);
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  install,
  Button,
  Badge,
  VueToast,
  Header,
  LazyLoad,
  Select,
  Swipe,
  SwipeItem,
  Tab,
  TabPane
}
