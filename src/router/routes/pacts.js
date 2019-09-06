export default [
  {
    name: 'pacts',
    path: '/pacts',
    component: () => import('@/views/Pacts'),
  },
  {
    path: '/pact/new',
    name: 'pact.new',
    component: () => import('@/views/Pacts/PactEdit'),
  },
  {
    path: '/pact/:id/edit',
    name: 'pact.edit',
    props: route => ({ id: Number(route.params.id) }),
    component: () => import('@/views/Pacts/PactEdit'),
  },
];
