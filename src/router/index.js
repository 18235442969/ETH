import Vue from 'vue'
import Router from 'vue-router'

import userRouter from "./modules/user.js";

Vue.use(Router)

export default new Router({
  routes: [
    userRouter
  ]
})
