// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import './permission' // permission control

import {AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin} from 'vux'
import validation from "./utils/validation";
import vueUtils from "./utils/vuxUtils";

import i18n from './i18n/index';

Vue.config.productionTip = false

FastClick.attach(document.body)

// 注册全局插件
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

let bus = new Vue();
Vue.prototype.bus = bus;
Vue.prototype.valid = validation;
Vue.prototype.vuxUtils = vueUtils;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
