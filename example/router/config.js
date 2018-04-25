import Container from '../components/Container'
import Button from '../components/Button/button';
import Badge from '../components/Badge/badge';
import Toast from '../components/Toast/toast';
import Header from '../components/Header/header';
import LazyLoad from "../components/LazyLoad/LazyLoad";
import Select from '../components/Select/Select';
import Swipe from '../components/Swipe/Swipe';
import Tab from '../components/Tab/Tab'
import Select2 from '../components/Select2/Select2';

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
  Select2: {
    path: '/select2',
    name: 'Select2',
    component: Select2
  }
}

export default config;