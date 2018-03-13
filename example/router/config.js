import Container from '../components/Container'
import Button from '../components/Button/button';
import Badge from '../components/Badge/badge';


let config = {
  container: {
    path: '/',
    name: 'container',
    component: Container
  },
  button:{
    path:'/button',
    name: 'button',
    component: Button
  },
  badge: {
    path: '/badge',
    name: 'badge',
    component: Badge
  }
}

export default config;
