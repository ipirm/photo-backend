import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SvgSprite from 'vue-svg-sprite';
import BodyScrollLockDirective from 'v-body-scroll-lock';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import VueCountdown from '@chenfengyuan/vue-countdown';
import 'swiper/swiper-bundle.css'
import vuescroll from 'vuescroll';

Vue.use(vuescroll, {
  ops: {
    scrollButton: {
      background: '#eeb609',
    },
    bar:{
      background: '#eeb609',
    }
  },
  name: 'vueScroll' // customize component name, default -> vueScroll
});
Vue.component(VueCountdown.name, VueCountdown);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.use(SvgSprite);
Vue.config.productionTip = false
Vue.use(BodyScrollLockDirective);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
