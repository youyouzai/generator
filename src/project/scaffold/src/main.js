import Vue from 'vue'
import router from './router'
import './utils/request'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './assets/css/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small' 
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
