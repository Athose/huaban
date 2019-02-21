// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'lib-flexible/flexible'
import Vuex from 'vuex'; 
Vue.use(Vuex);
import store from './store/store.js'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
import footerNav from './components/footer_nav'
import fenleiInfo from './components/fenlei_info'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { footerNav },
})
