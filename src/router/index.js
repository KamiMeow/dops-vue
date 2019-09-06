import Vue from 'vue';
import Router from 'vue-router';
import listners from './listners';
import initListners from './initListners';

import types from './routes/types';
import users from './routes/users';

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
      name: 'acts',
      path: '/acts',
      component: () => import('@/views/Acts'),
    },
    {
      name: 'pacts',
      path: '/pacts',
      component: () => import('@/views/Pacts'),
    },

    ...types,
    ...users,
    
    {
      path: '/*',
      redirect: '/users',
    },
  ],
});

export default initListners(router, listners);
