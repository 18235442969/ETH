import Vue from 'vue'
import Router from 'vue-router'

import userRouter from './modules/user';
import homeRouter from './modules/home';

import Login from '@/views/user/Login'
import Registe from '@/views/user/Registe'

Router.prototype.goBack = function () {
  this.isBack = true;
  this.isAppBack = true;
  window.history.go(-1)
}

Router.prototype.goAppBack = function () {
  this.isAppBack = true
  window.history.go(-1)
}

Vue.use(Router)

const router = new Router({
  routes: [
    userRouter,
    homeRouter,
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registe',
      name: 'registe',
      component: Registe
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/user/releaseMenu') {
    to.meta.title = `${to.params.type}Title`
  }
  next();
})

export default router;
