import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootswatch/dist/flatly/bootstrap.min.css'
import VModal from 'vue-js-modal'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueSimpleAlert from "vue-simple-alert"

Vue.config.productionTip = false
Vue.use(VModal)
Vue.use(VueSimpleAlert)

export const eventBus = new Vue({
  data:{
    //TODO global data if needed
    backendUrl: 'https://monjoshflask.azurewebsites.net'
  },
  methods: {
    //TODO global functions (if needed)
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
