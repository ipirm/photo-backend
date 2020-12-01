import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgSprite from 'vue-svg-sprite';
import BodyScrollLockDirective from 'v-body-scroll-lock';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import VueCountdown from '@chenfengyuan/vue-countdown';
import 'swiper/swiper-bundle.css'
import vClickOutside from 'v-click-outside'

Vue.component(VueCountdown.name, VueCountdown);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(vClickOutside)
Vue.use(SvgSprite);
Vue.config.productionTip = false
Vue.use(BodyScrollLockDirective);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
