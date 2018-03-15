import Container from '../components/Container'
import Button from '../components/Button/button';
import Badge from '../components/Badge/badge';
import Toast from '../components/Toast/toast';
import Header from '../components/Header/header';


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
/*   toast: {
    path: '/toast',
    name: 'Toast',
    component: Toast
  }, */
}

export default config;
