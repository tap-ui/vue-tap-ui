import Button from './components/button';
import Badge from './components/badge';
import Header from './components/header';

import {VueToast} from './components/toast';

import Select from './components/select'
import { Tab, TabPane } from './components/tab'
import { Swipe, SwipeItem } from './components/swipe';
import LazyLoad from './directive/lazyLoad';
import { Radio, RadioGroup } from './components/radio'
import { CheckboxGroup, Checkbox } from './components/checkbox'
import {Collapse, Panel} from './components/collapse';
import Switch from './components/switch';

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
  Vue.component(Radio.name, Radio);
  Vue.component(RadioGroup.name, RadioGroup);
  Vue.component(CheckboxGroup.name, CheckboxGroup);
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(Switch.name, Switch);
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
  TabPane,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox
}
