import Vue from 'vue'
import App from './App.vue'

import {LayoutPlugin} from 'bootstrap-vue'
Vue.use(LayoutPlugin)

import {ImagePlugin} from 'bootstrap-vue'
Vue.use(ImagePlugin)

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

import VScrollLock from 'v-scroll-lock'
Vue.use(VScrollLock, {
    bodyScrollOptions: {
        reserveScrollBarGap: true,
    },
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
