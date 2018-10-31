import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.use(VeeValidate)

new Vue({
  store,
  $_veeValidate: {
    validator: 'new'
  },
  render: h => h(App)
}).$mount('#app')
