let config = [
  {
    path: '/',
    name: 'container',
    component: () => import('../components/Container.vue'),
    desc: '列表容器'
  },
  {
    path: '/button',
    name: 'container',
    component: () => import('../components/Container.vue'),
    desc: 'Button 按钮'
  }
]

export default config;
