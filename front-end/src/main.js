import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootswatch/dist/flatly/bootstrap.min.css'
import VModal from 'vue-js-modal'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(VModal)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
