<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>
        <v-select
          :items="libraries"
          @change="selected"
          v-model="selectedLibraries"
          label="Libraries and Data"
          multiple
          chips
          hint="Select the libraries and data you might want."
          persistent-hint
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        selectedLibraries: [],
        libraries: [ 'ossim', 'elevation']
      }
    },
    methods: {
      selected: function(){
        this.$emit('can-continue', {value: true});
      }
    },
    activated() {
      if(this.selectedLibraries.length >= 1) {
        this.$emit('can-continue', {value: true});
      }     
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
