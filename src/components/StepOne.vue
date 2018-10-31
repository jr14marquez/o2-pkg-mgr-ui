<template>
  <v-container fluid>    
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>
        <v-select
          :items="apps"
          @change="selected"
          v-model="selectedApps"
          label="Apps"
          multiple
          chips
          hint="Select the apps you would like to install."
          persistent-hint
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store"
  export default {
    props: ['clickedNext', 'currentStep'],
    data () {
      return {
        selectedApps: [],
        apps: this.$store.getters.getApps
      }
    },
    methods: {
      selected: function(val){
        // Save to store 
        store.dispatch('addApp',val)
        this.$emit('can-continue', {value: true});
      },
    },
    activated() {
      if(this.selectedApps.length >= 1) {
        this.$emit('can-continue', {value: true});
      }     
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
