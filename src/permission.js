/*
* @Author: monkey
* @Date:   2018-09-13 09:54:55
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-13 09:54:57
*/
import router from "./router";
import store from "./store";
import auth from './utils/auth' // 验权


const whiteList = ['/login', '/registe'];

router.beforeEach((to, from, next) => {
	// store.dispatch('app/changeLoading', true);
  if (auth.getUserInfo()) { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/'})
      // store.dispatch('app/changeLoading', false);
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // store.dispatch('app/changeLoading', false);
    }
  }
})

router.afterEach(() => {
	// store.dispatch('app/changeLoading', false);
})