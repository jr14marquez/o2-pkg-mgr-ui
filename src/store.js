import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apps: []
  },
  mutations: {
  	addApp (state, app) {
      state.apps.push(app)
    },
    deleteApp (state, app) {
      // Todo: Delete app from list
    }
  },
  actions: {

  }
})
