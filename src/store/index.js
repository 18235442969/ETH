/*
* @Author: monkey
* @Date:   2018-09-13 10:09:19
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-13 10:13:28
*/
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    app
  },
  getters
})
