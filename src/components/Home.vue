<template>
<div>
  <v-toolbar dark color="primary">
    <v-toolbar-title>O2-PKG-MGR</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="dialog = !dialog" flat>Results</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <v-container>

        <section class="section">
          <div class="container">
              <div class="columns">
                  <div class="column is-8 is-offset-2">
                      <horizontal-stepper
                        :steps="demoSteps" @completed-step="completeStep"
                        @active-step="isStepActive" @stepper-finished="alert"
                        :top-buttons="true"
                      >                   
                      </horizontal-stepper>
                  </div>
              </div>
          </div>
        </section>
  </v-container>

  <v-dialog v-model="dialog" max-width="700px">
        <v-card>

          <v-card-title class="headline primary justify-center" primary-title>
            O2 APP RPMS and DATA
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="apps"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.data.name }}</td>
                <td class="text-xs-left">{{ props.item.data.version }}</td>
                <td class="text-xs-left">{{ props.item.data.timestamp }}</td>
                <td class="text-xs-left">{{ props.item.data.buildNumber }}</td>
                <td class="text-xs-left"><v-icon @click="download(props.item.data.url)">mdi-download</v-icon></td>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                  Sorry, You haven't built any apps yet. :(
                </v-alert>
              </template>
            </v-data-table>
       
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</div>
</template>

<script>
import HorizontalStepper from 'vue-stepper';
import store from "../store"
import AppLookup from '../services/AppLookup'
import axios from 'axios'

// This components will have the content for each stepper step.
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'
import StepFour from './StepFour.vue'

export default {
  components: {
    HorizontalStepper
  },
  data(){
    return {
      dialog: false,
      headers: [
        {
          text: 'App',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Version', sortable: false, value: 'version' },
        { text: 'Timestamp', sortable: false, value: 'timestamp' },
        { text: 'Build Number', sortable: false, value: 'buildNumber' },
        { text: 'Link', sortable: false, value: 'url' },
      ],
      apps: [],
      demoSteps: [
        {
          icon: 'apps',
          name: 'first',
          title: 'Apps',
          subtitle: 'Select Apps',
          component: StepOne,
          completed: false,
        },
        {
          icon: 'library_add',
          name: 'second',
          title: 'Libraries',
          subtitle: 'Add libraries and data',
          component: StepTwo,
          completed: false,
        },
        {
          icon: 'account_circle',
          name: 'third',
          title: 'Account Info',
          subtitle: 'Add user, group, and install/home info',
          component: StepThree,
          completed: false,
        },
        {
          icon: 'description',
          name: 'fourth',
          title: 'Review',
          subtitle: 'Review installation',
          component: StepFour,
          completed: false,
        }
      ],
    }
  },
  methods: {
    // Executed when @completed-step event is triggered
    completeStep(payload) {
      this.demoSteps.forEach((step) => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      })
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      this.demoSteps.forEach((step) => {
        if (step.name === payload.name) {
          if(step.completed === true) {
            step.completed = false;
          }
        }
      })
    },
    download(url) {
      window.open(url, '_blank');
    },
    // Executed when @stepper-finished event is triggered
    alert(payload) {
      var selectedApps = this.$store.getters.getSelectedApps
      var selectedLibraries = this.$store.getters.getSelectedLibraries
      var accountInfo = this.$store.getters.getAccountInfo
      console.log(selectedApps + ' ----' + selectedLibraries + '----------' + accountInfo)

      var promises = [] 
      selectedApps.map((app,i) => {
        var obj = { name: app.replace('-app',''), user: accountInfo.user, group: accountInfo.group, home: accountInfo.home }
        promises.push(AppLookup.getRpm(obj))
      })

      axios.all(promises).then(rpms => {
        console.log('rpms: ',rpms)
        this.apps = rpms
      })
      
    }
  }
}
</script>

<style>

</style>
