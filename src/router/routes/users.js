export default [
  {
    name: 'users',
    path: '/users',
    component: () => import('@/views/Users'),
  },
  {
    path: '/user/new',
    name: 'user.new',
    component: () => import('@/views/Users/UserEdit'),
  },
  {
    path: '/user/:id/edit',
    name: 'user.edit',
    props: route => ({ id: Number(route.params.id) }),
    component: () => import('@/views/Users/UserEdit'),
  },
];
