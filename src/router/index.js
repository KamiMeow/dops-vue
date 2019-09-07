import Vue from 'vue';
import Router from 'vue-router';
import listners from './listners';
import initListners from './initListners';

import patrouls from './routes/patrouls';
import types from './routes/types';
import users from './routes/users';
import pacts from './routes/pacts';
import acts from './routes/acts';

import Dashboard from '@/views/Dashboard';

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
      name: 'main',
      path: '/',
      component: Dashboard,
    },

    ...patrouls,
    ...types,
    ...users,
    ...pacts,
    ...acts,

    {
      path: '/*',
      redirect: '/',
    },
  ],
});

export default initListners(router, listners);
