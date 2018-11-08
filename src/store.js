import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apps: ['omar-ui-app','omar-services-app','omar-disk-cleanup-app','tlv-app', 'omar-cmdln-app'],
    fileDict: {
      'omar-systemd.sh': 'my omar-systemd description',
      '.env': 'my .env description',
      'omar-ui-app-<version>.jar': 'my ui jar description',
      'omar-ui-dev.yml': 'my ui dev description',
      'omar-ui-prod.yml': 'my ui prod description',
      'omar-ui.service': 'my omar-ui service description',
      'omar-services-app-<version>.jar': 'my services jar description',
      'omar-services-dev.yml': 'my services dev description',
      'omar-services-prod.yml': 'my services prod description',
      'omar-services.service': 'my omar-services service description',
      'omar-disk-cleanup-app-${version}.jar': 'my disk jar description',
      'omar-disk-cleanup.service': 'my omar-disk-cleanup service description',
      'omar-disk-cleanup.timer': 'my omar-disk-cleanup timer description',
      'tlv-app-<version>.jar': 'my tlv jar description',
      'tlv-dev.yml': 'my tlv dev description',
      'tlv-prod.yml': 'my tlv prod description',
      'tlv.service': 'my tlv service description',
      'omar-cmdln-app-<version>.jar': 'my cmdln jar description',
      'omar-cmdln-dev.yml': 'my cmdln dev description',
      'omar-cmdln-prod.yml': 'my cmdln prod description',
      'omar-cmdln.service': 'my omar-cmdln service description',
      'omar-cmdln.timer': 'my omar-cmdln timer description'
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
      return state.accountInfo
    },
    getFileInfo: (state) => (file) => {
      console.log('file:',file)
      return state.fileDict[file]
    },
  }
})
