<template>
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
</template>

<script>
import HorizontalStepper from 'vue-stepper';
import store from "../store"

// This components will have the content for each stepper step.
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'
import StepFour from './StepFour.vue'
import StepFive from './StepFive.vue'

export default {
  components: {
    HorizontalStepper
  },
  data(){
    return {
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
        },
        {
          icon: 'description',
          name: 'fourth',
          title: 'Review',
          subtitle: 'Review installation',
          component: StepFive,
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
    // Executed when @stepper-finished event is triggered
    alert(payload) {
      var selectedApps = this.$store.getters.getSelectedApps
      var selectedLibraries = this.$store.getters.getSelectedLibraries
      var accountInfo = this.$store.getters.getAccountInfo
      console.log(selectedApps + ' ----' + selectedLibraries + '----------' + accountInfo)
      alert(selectedApps + ' ----' + selectedLibraries + '----------' + accountInfo)
    }
  },
  mounted() {
    //store.dispatch('lookupApps')
  }
}
</script>

<style>

</style>
