import Vue from 'vue';
import Router from 'vue-router';
import listners from './listners';
import initListners from './initListners';

import patrouls from './routes/patrouls';
import types from './routes/types';
import users from './routes/users';
import pacts from './routes/pacts';
import acts from './routes/acts';

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

    ...patrouls,
    ...types,
    ...users,
    ...pacts,
    ...acts,
    
    {
      path: '/*',
      redirect: '/users',
    },
  ],
});

export default initListners(router, listners);
