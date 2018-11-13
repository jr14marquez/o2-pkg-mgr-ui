<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>
        <v-select
          :items="libraries"
          item-text="name"
          return-object
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
import store from "../store"
  export default {
    data () {
      return {
        selectedLibraries: [],
        libraries: this.$store.getters.getLibraries,
      }
    },
    methods: {
      selected (val) {
        // Save to store 
        store.dispatch('addLibrary',val)
        this.$emit('can-continue', {value: true});
      }
    },
    activated() {
      this.$emit('can-continue', {value: true});  
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
