import Vue from 'vue';
import Router from 'vue-router';
import listners from './listners';
import initListners from './initListners';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      meta: {
        access: true,
      },
      component: () => import('@/views/LoginPage'),
    },
    {
      name: 'users',
      path: '/users',
      component: () => import('@/views/Users'),
    },
    {
      name: 'acts',
      path: '/acts',
      component: () => import('@/views/Acts'),
    },
    {
      name: 'pacts',
      path: '/pacts',
      component: () => import('@/views/Pacts'),
    },
    {
      name: 'types',
      path: '/types',
      component: () => import('@/views/Types'),
    },
    {
      path: '/*',
      redirect: '/users',
    },
  ],
});

export default initListners(router, listners);
