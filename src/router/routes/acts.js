export default [
  {
    name: 'acts',
    path: '/acts',
    component: () => import('@/views/Acts'),
  },
  {
    path: '/act/new',
    name: 'act.new',
    component: () => import('@/views/Acts/ActEdit'),
  },
  {
    path: '/act/:id/edit',
    name: 'act.edit',
    props: route => ({ id: Number(route.params.id) }),
    component: () => import('@/views/Acts/ActEdit'),
  },
];
