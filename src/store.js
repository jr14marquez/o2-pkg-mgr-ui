import Vue from 'vue'
import Vuex from 'vuex'
import AppLookup from './services/AppLookup'
const Convert = require('xml-js');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apps: [
      { artifactId: 'omar-ui-app', groupId: 'io/ossim/omar/apps' },
      { artifactId: 'omar-services-app', groupId: 'io/ossim/omar/apps' },
      { artifactId: 'omar-disk-cleanup-app', groupId: 'io/ossim/omar/apps' },
      { artifactId: 'tlv-app', groupId: 'io/ossim/omar/apps' },
      { artifactId: 'omar-cmdln-app', groupId: 'omar/cmdln/app' }
    ],
    selectedApps: [],
    ltsApps: []
  },
  mutations: {
  	ADD_APP (state, apps) {
      state.selectedApps = apps
    },
    deleteApp (state, app) {
      // Todo: Delete app from list
    },
    LTS_APPS(state, app) {
        state.ltsApps = state.ltsApps.push(app)
    }
  },
  actions: {
    addApp( { commit, state }, apps) {
      commit('ADD_APP',apps)
    },
    lookupApps ({ commit, state }) {
      //const response = await AppLookup.getApp({ word: this.word })
      var apps = state.apps
      var ltsApps = state.ltsApps
      // Set xml parser options
      const parseOpts = { compact: true, trim: true, textKey: 'text' }

      apps.map(app => {
        var jarFile
        //var appBaseUrl = `${nexusUrl}/${app.groupId}/${app.artifactId}/maven-metadata.xml`
        /* Request to get versions of app and grab the latest. If more than one version exists it'll be in
        ** an array. If single version it'll just be an object with text as the key.
        */
        AppLookup.getAppVersions(app)
        .then(appBaseXml => {
       
          var versions = Convert.xml2js(appBaseXml.data,parseOpts).metadata.versioning.versions.version
          var ltsVersion = versions.length != undefined ? versions.pop().text : versions.text
          var ltsVersionUrl = { groupId: app.groupId, artifactId: app.artifactId, ltsVersion: ltsVersion }

          // Request the latest version 
          return Axios.getAppLts(ltsVersionUrl)
        })
        .then(ltsVersionXml => {
          // Determine the latest jar file
          var metadata = Convert.xml2js(ltsVersionXml.data,parseOpts).metadata
          var version = metadata.version.text
          var timestamp = metadata.versioning.snapshot.timestamp.text
          var buildNumber = metadata.versioning.snapshot.buildNumber.text
          jarFile = `${app.artifactId}-${version.split('-')[0]}-${timestamp}-${buildNumber}.jar`
          console.log('jar file: ', jarFile)
          commit('LTS_APPS',jarFile) //saves is
        })
        .catch(err => { console.log(err) })
      })
    }
  },
  getters: {
    getSelectedApps (state) {
      return state.selectedApps
    },
  }
})
