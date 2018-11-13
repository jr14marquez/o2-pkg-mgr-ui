import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apps: ['omar-ui-app','omar-services-app','omar-disk-cleanup-app','tlv-app', 'omar-cmdln-app'],
    fileDict: {
      'omar-systemd.sh': { 
        description: `This is pretty much the brains of starting up each O2 application. It Is a bash script that is called 
        by each systemd unit service file. This script checks for blank environment variables and will set defaults if some were 
        left empty. It will then go on to inject the SERVER_NAME into the omar-ui yaml configs and the Database info into the 
        omar-services yaml files if either of those apps were started. This script will ultimately call the application using the 
        java -jar <app-name> method passing in any options.`, 
        url: '' ,
      } ,
      '.env': { 
        description: `This file is a hidden environment file. This is really the only file you need to edit/pay attention to. This is 
        where you will set your environment variables for each of the applications. The file will be set with a few recommended values/defaults.
        This is where you will set your data base information, server name(domain name if you have one) and the environment you would like to run 
        the application in. For example setting ENV=prod will load the <app-name>-prod.yml file. This file is picked up by systemd and will set your 
        environment for you before starting the application.`, 
        url: ''
      },
      'omar-ui-app-<version>.jar': { 
        description: `The OMAR UI Service provides a user entry point for image analysis in the system. The UI provides a set of web pages and map 
        views that expose the various OMAR functions the user via search boxes, sliders, maps, etc.`, 
        url: ''},
      'omar-ui-dev.yml': {
        description: `This yaml config file is used for the dev environment for the omar-ui application. The omar-systemd.sh script will inject
        the SERVER_NAME variable into the sites section as a convenience feature.`,
        url: 'https://omar-rel.ossim.io/omar-docs/omar-ui/docs/install-guide/omar-ui/'
      },
      'omar-ui-prod.yml': {
        description: `This yaml config file is used for the prod environment for the omar-ui application. The omar-systemd.sh script will inject
        the SERVER_NAME variable into the sites section as a convenience feature.`,
        url: 'https://omar-rel.ossim.io/omar-docs/omar-ui/docs/install-guide/omar-ui/'
      },
      'omar-ui.service': { 
        description: `This service file is used by systemd for starting the omar-ui application. This file is used when systemctl start omar-ui 
        is run.  It will parse the .env file and set your environment. Upon doing so it will call the omar-systemd script passing parameters to
        start the application.`, 
        url: ''
      },
      'omar-services-app-<version>.jar': { 
        description: `This application is the backend services of O2. Several microservices such as omar-oms, omar-wms, omar-wfs, omar-wcs,
        omar-download, omar-geoscript, omar-stager, omar-superoverlay are included.`, 
        url: ''},
      'omar-services-dev.yml': {
        description: `This yaml config file is used for the dev environment for the omar-services application. This config file is a combination
        of the configs for all the microservices that make up the omar-services applicaiton.`,
        url: 'https://omar-rel.ossim.io/omar-docs'
      },
      'omar-services-prod.yml': {
        description: `This yaml config file is used for the prod environment for the omar-services application. This config file is a combination
        of the configs for all the microservices that make up the omar-services applicaiton.`,
        url: 'https://omar-rel.ossim.io/omar-docs'
      },
      'omar-services.service': { 
        description: `This service file is used by systemd for starting the omar-services application. This file is used when systemctl start omar-services
        is run.  It will parse the .env file and set your environment. Upon doing so it will call the omar-systemd script passing parameters to
        start the application.`, 
        url: ''
      },
      'omar-disk-cleanup-app-${version}.jar': { 
        description: `This application is used for monitoring the file system and purging imagery out of the database and filesystem given certain requirements.`, 
        url: ''
      },
      'omar-disk-cleanup.service': { 
        description: `This service file is used by systemd for starting the omar-disk-cleanup application. This file is used when systemctl start omar-disk-cleanup
        or systemctl start omar-disk-cleanup.timer which runs the service in intervals. It will parse the .env file and set your environment. Upon doing so it will call the 
        omar-systemd script passing parameters to start the application. This service has an alias of cleanup.`, 
        url: ''
      },
      'omar-disk-cleanup.timer': { 
        description: `This file is the timer for the omar-disk-cleanup application. By default it is set to run every day at midnigth and will use the environment
        variables set in the .env file. Feel free to change this file to meet your needs. This service has an alias of cleanup.`, 
        url: ''
      },
      'omar-disk-cleanup-dev.yml': {
        description: `This yaml config file is used for the dev environment for the omar-disk-cleanup application. You dont have to mess with this file. The variable set in
        the .env file we be picked up by this file.`,
        url: 'https://omar-rel.ossim.io/omar-docs/omar-disk-cleanup/docs/install-guide/omar-disk-cleanup/'
      },
      'omar-disk-cleanup-prod.yml': {
       description: `This yaml config file is used for the prod environment for the omar-disk-cleanup application. You dont have to mess with this file. The variable set in
        the .env file we be picked up by this file.`,
        url: 'https://omar-rel.ossim.io/omar-docs/omar-disk-cleanup/docs/install-guide/omar-disk-cleanup/'
      },
      'tlv-app-<version>.jar': { 
        description: 'An on demand flip book imagery viewer using the O2 library as its source. This application is the default O2 ortho viewer.', 
        url: ''},
      'tlv-dev.yml': {
         description: `This yaml config file is used for the dev environment for the tlv application. It will pick up it's environment variables 
         from the .env file. You can edit this file for more advanced settings.`,
        url: 'https://omar-rel.ossim.io/omar-docs/tlv/docs/install-guide/tlv/'
      },
      'tlv-prod.yml': {
        description: `This yaml config file is used for the prod environment for the tlv application. It will pick up it's environment variables 
         from the .env file. You can edit this file for more advanced settings.`,
        url: 'https://omar-rel.ossim.io/omar-docs/tlv/docs/install-guide/tlv/'
      },
      'tlv.service': { 
         description: `This service file is used by systemd for starting the tlv application. This file is used when systemctl start tlv
        is run.  It will parse the .env file and set your environment. Upon doing so it will call the omar-systemd script passing parameters to
        start the application.`, 
        url: ''},
      'omar-cmdln-app-<version>.jar': { 
        description: `This application is used for ingesting imagery into the database used by the O2 application. It will also create the historgrams and overviews 
        that are needed. This application can take a directory to crawl or file to ingest`, 
        url: ''},
      'omar-cmdln-dev.yml': {
        description: `This yaml config file is used for the dev environment for the omar-cmdln application. It will pick up it's environment variables 
         from the .env file. This can be used to ingest data into your dev database when doing awesome experiments. ;)`,
        url: ''
      },
      'omar-cmdln-prod.yml': {
        description: `This yaml config file is used for the prod environment for the omar-cmdln application. It will pick up it's environment variables 
         from the .env file. It will be used when your ENV variable is set to prod and will ingest imagery into your database if it's up of course.`,
        url: ''
      },
      'omar-cmdln.service': { 
        description: `This service file is used by systemd for starting the omar-cmldln application. This file is used when systemctl start omar-cmdln
        or systemctl start omar-cmdln.timer which runs the service in intervals. It will parse the .env file and set your environment. Upon doing so it will call the 
        omar-systemd script passing parameters to start the application. This service has as an alias of ingest.`, 
        url: ''
      },
      'omar-cmdln.timer': { 
        description: `This file is the timer for the omar-cmdln application. By default it is set to run every 10 minutes and will use the environment
        variables set in the .env file. Feel free to change this file to meet your needs. This service has an alias of ingest.`, 
        url: ''
      },
    },
    libraries: [ 
      { name: 'ossim', url: 'https://s3.amazonaws.com/o2-pkg-mgr/static/elevation.tgz' }, 
      { name: 'elevation', url: 'https://s3.amazonaws.com/o2-pkg-mgr/static/rpms.tgz' } 
    ],
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
