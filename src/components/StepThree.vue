<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8>

        <form>
          <v-text-field
            v-validate="'required|min:3'"
            v-model="accountInfo.user"
            :error-messages="errors.collect('user')"
            clearable
            label="User"
            placeholder="Enter a user for the application to run as."
            data-vv-name="user"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|min:3'"
            v-model="accountInfo.group"
            :error-messages="errors.collect('group')"
            label="Group"
            clearable
            placeholder="Enter a group for the application to run as."
            data-vv-name="group"
            required
          ></v-text-field>
          <v-text-field
            v-validate="'required|min:3'"
            v-model="accountInfo.home"
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

  export default {
    data () {
      return {
        //accountInfo: this.$store.getters.getAccountInfo,
      }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    computed: {
      accountInfo() {
        return this.$store.getters.getAccountInfo
      }
    },
    methods: {
      selected: function(val){
        // Save to store 
        // store.dispatch('addLibrary',val)
        this.$emit('can-continue', {value: true});
      },
      submit () {
        this.$validator.validateAll().then(result => {
          // Save to store if result is true
          console.log('result from submit: ', result)
          if(result) {
            store.dispatch('addAccountInfo',this.accountInfo)
          }
        })
        .catch(err => console.error('an error occurred validating: ',err))

      },
      clear () {
        this.accountInfo = {
          user: '',
          home: '',
          group: ''
        }
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
