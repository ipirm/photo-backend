<template>
  <div>
    <Header />
    <div class="contest-page" @click="activeSort = false" v-if="concert">
      <div class="description">
        <div class="description_text">
          <p class="description_text_subtitle style_title">
            {{ $i18n.locale === 'RU' ? concert.title : ($i18n.locale === 'EN' ? concert.title__en : '') }}
          </p>

          <div class="description_text_date style_text">
            <p>{{ $t('description.created') }} {{ moment(concert.createdAt).format('DD.MM.YYYY') }} • {{ $t('description.starts') }} {{ concert.startDate }} {{ $t('description.to') }} {{ concert.endDate }}</p>
          </div>
          <p class="description_text_main-text style_text">
            {{ $i18n.locale === 'RU' ? concert.description : ($i18n.locale === 'EN' ? concert.description__en : '') }}
          </p>
        </div>
        <div class="description_days">
          <div>
            <countdown :time="Math.max(startDateTimestamp - moment().unix() * 1000, 0)" :transform="transform" class="description_days_title style_title">
              <template slot-scope="props">
                {{ props.days }}{{ $t('timer.d') }} : {{ props.hours }}{{ $t('timer.h') }} : {{ props.minutes }}{{ $t('timer.m') }}
                  : {{ props.seconds }}{{ $t('timer.s') }}
              </template>
            </countdown>
            <p class="description_days_to-end style_text" v-t="'description.to-end'" />
          </div>
          <div class="description_prizes">
            <div class="prize" v-for="(place, i) in concert.places" :key="i">
              <div class="cost">${{ place.total }}</div>
              <div class="place">{{ i+1 }} {{ $t('description.place') }}</div>
            </div>
          </div>
          <div>
            <div class="btn_style btn_contest_participate" @click="activeLoad = true" v-t="'description.participate'" />
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
              <span class="participate_popup_text-style" v-t="'participate.upload'" />
              <p>{{ $i18n.locale === 'RU' ? concert.title : ($i18n.locale === 'EN' ? concert.title__en : '') }}</p>
            </div>
            <div class="participate_popup_upload">
              <div class="participate_popup_upload_container">
                <span class="participate_popup_text-style" v-t="'participate.drag-here'" />
                <a class="btn-upload btn_style">
                  <input
                    placeholder="Загрузить файлы"
                    type="file"
                    name="file"
                    id="file"
                    @change="onFileChange"
                    class="inputStyle"
                  />
                  <label for="file" v-t="'participate.upload-file'" />
                </a>

                <p v-t="'participate.max-size'" />
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
                    :key="i"
                    v-if="i !== 3"
                  >
                    <img :src="item.url" />
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
              <div class="btn_participate btn_style popup_btn-style" @click="onParticipate()" v-if="user">
                <span v-t="'participate.participate'" />
              </div>
              <div class="btn_participate btn_style popup_btn-style" v-else @click="toAuth()">
                <span v-t="'participate.auth'" />
              </div>
              <p v-t="'participate.cost'" />
              <span class="participate_popup_text-style"> $10 </span>
            </div>
          </div>
        </div>
      </div>
      <div class="participates">
        <div class="participates_util">
          <div class="participates_util_wrapper">
            <p class="participates_util_title style_text" v-t="'participants.participants'" />
            <div class="description_text_stata style_text">
              <div class="description_text_stata_column">
                <span> {{ concert.participants }} </span>
                <p v-t="'participants.total-participants'" />
              </div>
              <div class="description_text_stata_column">
                <span> {{ concert.voters }} </span>
                <p v-t="'participants.voted'" />
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
        <div class="participate_wrapper" v-if="participantsToShow" :class="{all: loadedAllParticipants}">
          <div class="participate_wrapper_overlay" v-for="(item, i) in participantsToShow" :key="i">
            <FancySwiper
              v-body-scroll-lock="activePhoto !== -1"
              v-if="activePhoto === i"
              @closePopup="closePopupParrent()"
              :banners="item.images"
            />
            <div class="participates_item">
              <div class="participates_item_img" @click="showPhoto(i)">
                <img :src="item.images[0].url" :alt="item.user.name + ' ' + item.user.last_name">
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
                  <p class="style_text">{{ item.likesCount.toString() }}</p>
                  <div class="likes-tooltip" v-if="item.likesCount && i == activeLike">
                    <div class="likes-tooltip-wrapper">
                      <template v-for="(like, k) in item.user.likes">
                        <img
                          :key="k"
                          v-if="k <= 4"
                          :src="like.user.avatar"
                          :alt="like.name"
                        />
                      </template>
                    </div>
                    <a href="#" @click.prevent="showPopUp(i)">... {{ i > 1 ? $t('tooltips.likes.also') + (i + 1) : $t('tooltips.likes.more') }}</a>
                  </div>
                </div>
                <div v-if="user && item.user.id === user.id" class="leader">
                  <p class="style_text" v-t="'you'" />
                </div>
                <div v-if="user && participants && participants.firstConcerts && item.user.id !== user.id && participants.firstConcerts.find(i => i.user.id == item.user.id)" class="leader">
                  <p class="style_text" v-t="'your-choice'" />
                </div>
              </div>
              <div class="participates_item_name" @click="showPhoto(i)">
                <p class="style_text">{{ item.user.name }} {{ item.user.last_name }}</p>
                <span class="style_text">{{ item.user.city }}</span>
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
                      <p class="likes_popup_title_number">{{ item.likesCount }}</p>
                      <p class="likes_popup_title_voted" v-t="'likes.voted'" />
                      <p class="likes_popup_title_subtitle">{{ $i18n.locale === 'RU' ? concert.title : ($i18n.locale === 'EN' ? concert.title__en : '') }}</p>
                    </div>
                    <div class="likes_popup_wrapper" v-body-scroll-lock="activePopUp === i">
                      <a
                        class="likes_popup_wrapper_item"
                        v-for="(like, i) in item.user.likes"
                        :key="i"
                      >
                        <div
                          class="likes_popup_img"
                          :style="{
                            backgroundImage: `url(${like.user.avatar})`
                          }"
                        ></div>
                        <p>{{ like.name }}</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn_like" @click="like({userId: item.user.id, isLike: user && participants && !(participants.firstConcerts && item.user.id !== user.id && participants.firstConcerts.find(i => i.user.id == item.user.id))})" v-if="!user || item.user.id != user.id" :class="{active: user && participants && participants.firstConcerts && item.user.id !== user.id && participants.firstConcerts.find(i => i.user.id == item.user.id) }">
                <img
                  svg-inline
                  class="icon svg-path-color"
                  src="@/assets/icons/btn-like.svg"
                  alt="example"
                />
              </div>
            </div>
          </div>
        </div>
        <infinite-loading 
          @infinite="infiniteHandler"
          :key="infinityKey" 
          :distance="infinityDistance"
        >
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/default/Header.vue";
import Footer from "@/components/default/Footer.vue";
import FancySwiper from "@/components/default/FancySwiper.vue";
import InfiniteLoading from 'vue-infinite-loading';
import moment from 'moment'

import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    Header,
    Footer,
    FancySwiper,
    InfiniteLoading
  },

  data() {
    return {
      infinityDistance: 100,
      infinityKey: 1,
      loadedAllParticipants: false,

      loading: false, // TODO
      activeLike: -1,
      activePopUp: -1,
      activeSort: false,
      activePhoto: -1,
      activeLoad: false,
      activeSelected: this.$t('sorting.show-all'),
      sortItems: [
        this.$t('sorting.by-likes'),
        this.$t('sorting.by-created-date'),
        this.$t('sorting.show-all')
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

  created() {
    this.getConcert();
    this.getParticipants();
  },

  computed: {
    ...mapState(['user', 'concert', 'participants']),

    moment() {
      return moment
    },

    startDateTimestamp() {
      const date = this.concert.startDate.split('.');
      return (new Date(date[2], date[1] - 1, date[0])).getTime();
    },

    participantsToShow() {
      if (this.participants) {
        if (this.user && this.participants.firstConcerts) {
          if (this.participants.firstConcerts.length === 1)
            return [...this.participants.firstConcerts, ...this.participants.items]

          return [this.participants.firstConcerts.find(i => i.user.id == this.user.id), this.participants.firstConcerts.find(i => i.user.id != this.user.id), ...this.participants.items]
        } else
          return this.participants.items
      }
      return null
    }
  },

  methods: {
    ...mapActions(['participate', 'getConcert', 'getParticipants', 'like', 'getMoreParticipants']),
    ...mapMutations(['increasePage']),

    toAuth() {
      this.$root.$emit('auth');
      this.activeLoad = false;
    },

    infiniteHandler($state) {
      if (this.participants) {
        if (this.participants.length < parseInt(this.participants.meta.totalItems)) {
          this.increasePage();
          this.getMoreParticipants().then(() => {
            $state.loaded();
          })
        } else {
          $state.complete()
          this.loadedAllParticipants = true;
        }
      } else {
        setTimeout(() => {
          $state.loaded();
        }, 5000);
      }
    },

    async onParticipate() {
      if (!this.user) {
        this.$toasted.error('Пожалуйста авторизуйтесь');
        return;
      }

      if (this.files.length) {
        await this.participate(this.files);
      } else {
        this.$toasted.error('Укажите минимум 1 фото');
      }
    },

    removeFile(i) {
      this.files = this.files.filter((item, index) => index !== i);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.files.push({
          url: URL.createObjectURL(file),
          file
        });
      }
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
      let query;
      if (item == this.$t('sorting.by-likes')) query = 'likes'
      else if (item == this.$t('sorting.by-created-date')) query = 'date'
      this.getParticipants(query);
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
