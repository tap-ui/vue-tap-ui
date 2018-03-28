import Container from '../components/Container'
import Button from '../components/Button/button';
import Badge from '../components/Badge/badge';
import Toast from '../components/Toast/toast';
import Header from '../components/Header/header';
import Swipe from '../components/Swipe/Swipe';
// import Header from '../components/Header/header';
// import LazyLoad from "../components/LazyLoad/LazyLoad.vue";
let LazyLoad = ()=> import('../components/LazyLoad/LazyLoad');
let config = {
  container: {
    path: '/',
    name: 'Container',
    component: Container
  },
  button:{
    path:'/button',
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
  }
/*   toast: {
    path: '/toast',
    name: 'Toast',
    component: Toast
  }, */
}

export default config;
