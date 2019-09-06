export default [
  {
    name: 'types',
    path: '/types',
    component: () => import('@/views/Types'),
  },
  {
    path: '/type/new',
    name: 'type.new',
    component: () => import('@/views/Types/TypeEdit'),
  },
  {
    path: '/type/:id/edit',
    name: 'type.edit',
    props: route => ({ id: Number(route.params.id) }),
    component: () => import('@/views/Types/TypeEdit'),
  },
];
