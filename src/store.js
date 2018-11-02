import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apps: ['omar-ui-app','omar-services-app','omar-disk-cleanup-app','tlv-app', 'omar-cmdln-app'],
    fileDict: {
      'omar-systemd.sh': 'my omar-systemd description',
      '.env': 'my .env description'
    },
    libraries: ['ossim','elevation'],
    selectedApps: [],
    selectedLibraries: [],
    accountInfo: {
      user: 'omar',
      group: 'project-omar',
      home: '/usr/share/omar',
    }
  },
  mutations: {
  	ADD_APP (state, apps) {
      state.selectedApps = apps
    },
    ADD_LIBRARY (state, library) {
      state.selectedLibraries = library
    },
    ADD_ACCOUNT_INFO (state, info) {
      console.log('in act')
      state.accountInfo = info
    }
  },
  actions: {
    addApp( { commit, state }, apps) {
      commit('ADD_APP',apps)
    },
    addLibrary( { commit, state }, library) {
      commit('ADD_LIBRARY',library)
    },
    addAccountInfo( { commit, state }, info) {
      commit('ADD_ACCOUNT_INFO',info)
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
    getAccountInfo (state) {
      console.log('in actget with state: ',state.accountInfo)
      return state.accountInfo
    },
  }
})
