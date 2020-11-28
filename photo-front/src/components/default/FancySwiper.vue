<template>
  <div class="overlay-swiper" @click="closeModal">
    <div class="overlay-swiper-row">
      <div class="overlay-swiper_text" @click="closeModal">
        <span>Закрыть</span>
      </div>
      <div v-swiper:mySwiper="swiperOption" @click.stop>
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="banner" v-for="banner in banners">
            <img src="@/static/images/swiper1.png" />
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FancySwiper",
  data() {
    return {
      banners: [
        "@/static/images/swiper1.png",
        "@/static/images/swiper2.png",
        "@/static/images/swiper3.png"
      ],
      swiperOption: {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 10,
        grabCursor: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
        // ...
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit("closePopup");
      this.mySwiper.destroy();
    }
  }
};
</script>
