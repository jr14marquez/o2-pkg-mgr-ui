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
  export default {
    props: ['clickedNext', 'currentStep'],
    data () {
      return {
        selectedApps: [],
        apps: [ 'omar-ui', 'omar-services', 'omar-disk-cleanup', 'omar-cmdln (ingest)', 'tlv', 'omar-httpd-proxy (Required for install)' ]
      }
    },
    methods: {
      selected: function(){
        // Save to store 
        
        this.$emit('can-continue', {value: true});
      },
    },
    activated() {
      if(this.selectedApps.length >= 1) {
        this.$emit('can-continue', {value: true});
      }     
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
