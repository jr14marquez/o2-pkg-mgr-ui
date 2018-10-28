<template>
  <v-container>
        <section class="section">
          <div class="container">
              <div class="columns">
                  <div class="column is-8 is-offset-2">
                      <horizontal-stepper :steps="demoSteps" @completed-step="completeStep"
                                          @active-step="isStepActive" @stepper-finished="alert"
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
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';

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
      var res = JSON.stringify(payload)
      alert(res)
    }
  },
  mounted() {
    store.dispatch('lookupApps')
  }
}
</script>

<style>

</style>
