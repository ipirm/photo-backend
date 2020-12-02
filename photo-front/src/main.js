import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgSprite from 'vue-svg-sprite';
import BodyScrollLockDirective from 'v-body-scroll-lock';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import i18n from './locales'
import lsService from './services/lsService'

import VueCountdown from '@chenfengyuan/vue-countdown';
import 'swiper/swiper-bundle.css'
import vClickOutside from 'v-click-outside'
import Toasted from 'vue-toasted';

i18n.locale = lsService.getLocale();


Vue.component(VueCountdown.name, VueCountdown);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(vClickOutside)
Vue.use(SvgSprite);
Vue.config.productionTip = false
Vue.use(BodyScrollLockDirective);
Vue.use(Toasted, {
	position: 'top-center',
	duration: 5000
})

new Vue({
	i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
