// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import Vuebar from 'vuebar'
import VueSimpleSVG from 'vue-simple-svg'
import vClickOutside from 'v-click-outside'

// Reset css import
import 'normalize.css'

// Vue plugins
Vue.use(Vuebar)
Vue.use(VueSimpleSVG)
Vue.use(vClickOutside)

Vue.config.productionTip = false

// Event bus
export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
