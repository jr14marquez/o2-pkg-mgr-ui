<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>

        <form>
          <v-text-field
            v-validate="'required|max:10|min:3'"
            v-model="user"
            :counter="10"
            :error-messages="errors.collect('user')"
            clearable
            label="User"
            placeholder="Enter a user for the application to run as."
            data-vv-name="user"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|max:10|min:3'"
            v-model="group"
            :error-messages="errors.collect('group')"
            label="Group"
            clearable
            placeholder="Enter a group for the application to run as."
            data-vv-name="group"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|min:3'"
            v-model="home"
            clearable
            :error-messages="errors.collect('home')"
            label="Home/Install Directory"
            placeholder="Enter directory you'd like to install the apps under."
            data-vv-name="home"
            required
          ></v-text-field>

          <v-btn @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store"
// import { Validator } from 'vee-validate';
  export default {
    data () {
      return {
        user: 'omar',
        group: 'project-omar',
        home: '/usr/share/omar',
        dictionary: {
          custom: {
            name: {
              required: () => 'Name can not be empty',
              max: 'The name field may not be greater than 10 characters'
              // custom messages
            },
          }
        }
      }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      selected: function(val){
        // Save to store 
        // store.dispatch('addLibrary',val)
        this.$emit('can-continue', {value: true});
      },
      submit () {
        this.$validator.validateAll().then(result => {
          console.log('res: ', result)
        })
        .catch(err => {
          console.log('an err: ',err)
        })

      },
      clear () {
        this.user = ''
        this.group = ''
        this.home = ''
        this.$validator.reset()
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
