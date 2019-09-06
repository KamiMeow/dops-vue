export default [
  {
    name: 'patrouls',
    path: '/patrouls',
    component: () => import('@/views/Patrouls'),
  },
  {
    path: '/patroul/new',
    name: 'patroul.new',
    component: () => import('@/views/Patrouls/PatroulEdit'),
  },
];
