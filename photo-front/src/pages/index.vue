<template>
  <div>
    <Header />
    <div class="contest-page" @click="activeSort = false">
      <div class="description">
        <div class="description_text">
          <p class="description_text_subtitle style_title">
            Мисс Инстаграм 2020
          </p>

          <div class="description_text_date style_text">
            <p>Создан 10.11.2020 • Идет с 10.11.2020 по 10.12.2020</p>
          </div>
          <p class="description_text_main-text style_text">
            Phasellus egestas adipiscing accumsan nulla purus. Augue turpis
            tincidunt quis id diam nec. Habitasse erat velit ac pellentesque.
            Porttitor enim cras a aliquet volutpat urna. Ac ac eu, at duis. Amet
            ipsum varius ut dignissim. Ultrices ornare sit ac augue lorem
          </p>
        </div>
        <div class="description_days">
          <div>
            <countdown :time="27 * 24 * 60 * 60 * 1000" :transform="transform">
              <template slot-scope="props">
                <p class="description_days_title style_title">
                  {{ props.days }}д : {{ props.hours }}ч : {{ props.minutes }}м
                  : {{ props.seconds }}с
                </p>
              </template>
            </countdown>
            <p class="description_days_to-end style_text">До завершения</p>
          </div>
          <div class="description_prizes">
            <div class="prize">
              <div class="cost">$1000</div>
              <div class="place">1 место</div>
            </div>
            <div class="prize">
              <div class="cost">$500</div>
              <div class="place">2 место</div>
            </div>
            <div class="prize">
              <div class="cost">$300</div>
              <div class="place">3 место</div>
            </div>
          </div>
          <div>
            <a
              class="btn_style btn_contest_participate"
              @click="activeLoad = true"
            >
              Участвовать</a
            >
          </div>
        </div>
      </div>

      <div
        class="overlay-swiper participate-slider"
        v-if="activeLoad"
        @click="activeLoad = false"
        v-body-scroll-lock="activeLoad"
      >
        <div class="overlay-swiper-row">
          <div class="participate_popup" @click.stop>
            <a class="btn-exit-aligne" @click="activeLoad = false">
              <img
                svg-inline
                class="icon svg-stroke-color"
                src="@/assets/icons/btn-exit.svg"
                alt="example"
              />
            </a>
            <div class="participate_popup_title">
              <span class="participate_popup_text-style">
                Загрузите фото для участия в конкурсе
              </span>
              <p>Мисс Инстаграм 2020</p>
            </div>
            <div class="participate_popup_upload">
              <div class="participate_popup_upload_container">
                <span class="participate_popup_text-style">
                  Перетащите файлы сюда
                </span>
                <a class="btn-upload btn_style">
                  <input
                    placeholder="Загрузить файлы"
                    type="file"
                    name="file"
                    id="file"
                    @change="onFileChange"
                    class="inputStyle"
                  />
                  <label for="file">Загрузите файл</label>
                </a>

                <p>Максимальный размер файла 10 Мб. Форматы JPEG, PNG.</p>
              </div>
            </div>
            <div
              v-swiper:mySwiper2="swiperOption"
              class="participate_popup_photo"
            >
              <div class="swiper-wrapper">
                <template v-for="(item, i) in files">
                  <div
                    class="swiper-slide participate_popup_photo_item"
                    :key="item"
                    v-if="i !== 3"
                  >
                    <img :src="item" />
                    <div class="popup_photo_item_close" @click="removeFile(i)">
                      <img
                        svg-inline
                        class="icon upload_exit"
                        src="@/assets/icons/btn-exit.svg"
                        alt="example"
                      />
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="participate_popup_footer">
              <a class="btn_participate btn_style popup_btn-style">
                <span> Участвовать </span>
              </a>
              <p>С вашего баланса спишется</p>
              <span class="participate_popup_text-style"> 34 ₽ </span>
            </div>
          </div>
        </div>
      </div>
      <div class="participates">
        <div class="participates_util">
          <div class="participates_util_wrapper">
            <p class="participates_util_title style_text">Участники</p>
            <div class="description_text_stata style_text">
              <div class="description_text_stata_column">
                <span> 36 </span>
                <p>Участников</p>
              </div>
              <div class="description_text_stata_column">
                <span> 148 </span>
                <p>Проголосовало</p>
              </div>
            </div>
          </div>
          <div
            :class="[
              'participates_util_order',
              'style_text',
              { order_active: activeSort }
            ]"
            @click.stop="activeSort = !activeSort"
          >
            <div class="participates_util_order_wrapper">
              <p class="active-selected">{{ activeSelected }}</p>
              <img
                svg-inline
                class="icon svg-stroke-color"
                src="@/assets/icons/arrow-bottom.svg"
                alt="example"
              />
            </div>
            <div class="participates_util_options">
              <template v-for="(item, i) in sortItems">
                <p
                  v-if="item !== activeSelected"
                  @click="selectItem(item)"
                  :key="i"
                >
                  {{ item }}
                </p>
              </template>
            </div>
          </div>
        </div>
        <div class="participate_wrapper">
          <div class="participate_wrapper_overlay" v-for="(item, i) in 16" :key="i">
            <FancySwiper
              v-body-scroll-lock="activePhoto !== -1"
              v-if="activePhoto === i"
              @closePopup="closePopupParrent()"
            />
            <div class="participates_item">
              <div class="participates_item_img" @click="showPhoto(i)">
                <img src="@/static/images/lidia.png" alt="lidia">
              </div>
              <div
                class="participates_item_header"
              >
                <div class="like svg-path-color" :class="{hovered: activeLike == i}" @mouseover="mouseOver(i)" @mouseleave="activeLike = -1">
                  <img
                    svg-inline
                    class="icon"
                    src="@/assets/icons/like.svg"
                    alt="example"
                  />
                  <p class="style_text">{{ i + 1 }}</p>
                  <div class="likes-tooltip" v-if="activeLike == i">
                    <div class="likes-tooltip-wrapper">
                      <template v-for="item in i + 1">
                        <img
                          :key="item"
                          v-if="item <= 4"
                          src="../static/images/tooltip-image.png"
                        />
                      </template>
                    </div>
                    <a href="#" @click.prevent="showPopUp(i)"
                      >... и еще {{ i + 1 }} человека</a
                    >
                  </div>
                </div>
                <div v-if="i === 0" class="leader">
                  <p class="style_text">Ваш выбор</p>
                </div>
                <div v-if="i === 1" class="leader">
                  <img
                    svg-inline
                    class="icon"
                    src="@/assets/icons/crown.svg"
                    alt="example"
                  />
                  <p class="style_text">Лидер</p>
                </div>
              </div>
              <div class="participates_item_name" @click="showPhoto(i)">
                <p class="style_text">Лидия Русакова</p>
                <span class="style_text"> г. Москва</span>
                <a class="participates_item_share">
                  <img
                    svg-inline
                    class="icon"
                    src="@/assets/icons/share.svg"
                    alt="example"
                  />
                </a>
              </div>
              <div
                class="overlay-swiper"
                v-if="activePopUp === i"
                @click="activePopUp = -1"
                v-body-scroll-lock="activePopUp === i"
              >
                <div class="overlay-swiper-row">
                  <div class="likes_popup" @click.stop>
                    <a class="btn_exit" @click.stop="closePopUp(i)">
                      <img
                        svg-inline
                        class="icon svg-stroke-color"
                        src="@/assets/icons/btn-exit.svg"
                        alt="example"
                      />
                    </a>
                    <div class="likes_popup_title">
                      <p class="likes_popup_title_number">{{ i + 1 }}</p>
                      <p class="likes_popup_title_voted">
                        Проголосовали в конкурсе
                      </p>
                      <p class="likes_popup_title_subtitle">
                        Мисс Инстаграм 2020
                      </p>
                    </div>
                    <div class="likes_popup_wrapper">
                      <a
                        class="likes_popup_wrapper_item"
                        v-for="index in i + 1"
                        :key="index"
                      >
                        <div
                          class="likes_popup_img"
                          :style="{
                            backgroundImage:
                              'url(' +
                              require('@/static/images/elena.png') +
                              ')'
                          }"
                        ></div>
                        <p>Елена Свигова</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a class="btn_like">
                <img
                  svg-inline
                  class="icon svg-path-color"
                  src="@/assets/icons/btn-like.svg"
                  alt="example"
                />
              </a>
            </div>
          </div>
        </div>
        <a href="#" class="btn_style btn_load" @click.prevent>
          <span>Загрузить еще </span>
        </a>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/default/Header.vue";
import Footer from "@/components/default/Footer.vue";
import FancySwiper from "@/components/default/FancySwiper.vue";

export default {
  components: {
    Header,
    Footer,
    FancySwiper
  },
  data() {
    return {
      activeLike: -1,
      activePopUp: -1,
      activeSort: false,
      activePhoto: -1,
      activeLoad: false,
      activeSelected: "Сортировка",
      sortItems: [
        "По количеству лайков",
        "По количеству проголосовавших",
        "По дате создания",
        "По дате завершения",
        "Показать все"
      ],
      files: [],
      swiperOption: {
        centeredSlides: false,
        slidesPerView: 2,
        spaceBetween: 5,
        observer: true,
        observeParents: true,
        breakpoints: {
          // when window width is >= 320px
          500: {
            centeredSlides: false,
            slidesPerView: 3,
            spaceBetween: 5
          }
        }
      }
    };
  },
  methods: {
    removeFile(i) {
      this.files = this.files.filter((item, index) => index !== i);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.files.push(URL.createObjectURL(file));
    },
    closePopupParrent() {
      this.activePhoto = -1;
    },
    mouseOver(i) {
      this.activeLike = i;
    },
    showPopUp(i) {
      this.activeSort = false;
      this.activePopUp = i;
    },
    closePopUp() {
      this.activePopUp = -1;
      this.activeLike = -1;
    },
    selectItem(item) {
      this.activeSelected = item;
    },
    showPhoto(i) {
      this.activePopUp = -1;
      this.activeLike = -1;
      this.activePhoto = i;
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;

        // uses singular form when the value is less than 2
        // const word = value < 2 ? key.replace(/s$/, "") : key;

        props[key] = `${digits}`;
      });

      return props;
    }
  }
};
</script>

<style></style>
