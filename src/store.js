import Vue from 'vue'
import Vuex from 'vuex'
import AppLookup from './services/AppLookup'
const Convert = require('xml-js');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apps: ['omar-ui-app','omar-services-app','omar-disk-cleanup-app','tlv-app', 'omar-cmdln-app'],
    libraries: ['ossim','elevation'],
    selectedApps: [],
    selectedLibraries: []
  },
  mutations: {
  	ADD_APP (state, apps) {
      state.selectedApps = apps
    },
    ADD_LIBRARY (state, library) {
      state.selectedLibraries = library
    }
  },
  actions: {
    addApp( { commit, state }, apps) {
      commit('ADD_APP',apps)
    },
    addLibrary( { commit, state }, library) {
      commit('ADD_LIBRARY',library)
    }
  },
  getters: {
    getApps (state) {
      return state.apps
    },
    getSelectedApps (state) {
      return state.selectedApps
    },
    getLibraries (state) {
      return state.libraries
    },
    getSelectedLibraries (state) {
      return state.selectedLibraries
    },
  }
})
