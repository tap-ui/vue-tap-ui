import Container from '../components/Container'
import Button from '../components/Button/button';
import Collapse from '../components/Collapse/collapse';
import Badge from '../components/Badge/badge';
import Toast from '../components/Toast/toast';
import Header from '../components/Header/header';
import LazyLoad from "../components/LazyLoad/LazyLoad";
import Select from '../components/Select/Select';
import Swipe from '../components/Swipe/Swipe';
import Tab from '../components/Tab/Tab'
import Radio from '../components/Radio/Radio'
import Checkbox from '../components/Checkbox/Checkbox'
import Switch from '../components/Switch/Switch'

let config = {
  container: {
    path: '/',
    name: 'Container',
    component: Container
  },
  button: {
    path: '/button',
    name: 'Button',
    component: Button
  },
  badge: {
    path: '/badge',
    name: 'Badge',
    component: Badge
  },
  Header: {
    path: '/header',
    name: 'Header',
    component: Header
  },
  Swipe: {
    path: '/swipe',
    name: 'Swipe',
    component: Swipe
  },
  LazyLoad: {
    path: '/lazyLoad',
    name: "LazyLoad",
    component: LazyLoad
  },
  Select: {
    path: '/select',
    name: 'Select',
    component: Select
  },
  Tab: {
    path: '/tab',
    name: 'Tab',
    component: Tab
  },
  toast: {
    path: '/toast',
    name: 'Toast',
    component: Toast
  },
  Radio: {
    path: '/radio',
    name: 'Radio',
    component: Radio
  },
  Checkbox: {
    path: '/checkbox',
    name: 'Checkbox',
    component: Checkbox
  },
  Collapse: {
    path: '/collapse',
    name: 'Collapse',
    component: Collapse
  },
  Switch: {
    path: '/switch',
    name: 'Switch',
    component: Switch
  },
}

export default config;
