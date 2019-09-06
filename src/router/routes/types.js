export default [
  {
    path: '/new',
    name: 'type.new',
    component: () => import('@/views/Types/TypeEdit'),
  },
  {
    path: '/edit/:id',
    name: 'type.edit',
    component: () => import('@/views/Types/TypeEdit'),
  },
];
