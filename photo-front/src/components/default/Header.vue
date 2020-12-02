<template>
  <header>
    <div class="header_logo">
      <router-link class="header_logo_img" to="/">
        <!-- <img src="">  -->
        Лого
      </router-link>
      <a class="header_logo_text"> Топовые фото-конкурсы </a>
    </div>
    <div class="header_main">
      <router-link to="/" :class="{header_main_active: $route.path == '/'}">Главная</router-link>
      <router-link to="/about" :class="{header_main_active: $route.path == '/about'}">О нас</router-link>
      <router-link to="/rules" :class="{header_main_active: $route.path == '/rules'}">Правила</router-link>
    </div>
    <div class="header_util">
      <div class="header_util_container header_search desktop" @click="isSearchActive = true" v-click-outside="() => {isSearchActive = false}">
        <img
          svg-inline
          class="icon header_util_img svg-stroke-color"
          src="@/assets/icons/search.svg"
          alt="example"
          @click="search()"
        />
        <input class="header_util_style header_search_input" v-model="searchInput" :class="{active: searchInput || isSearchActive}" placeholder="Поиск" @keydown.enter="search()">
      </div>
      <div class="header_util_container header_util_style header_login_container">
        <template v-if="isLoggedIn">
          <router-link to="/account" class="header_login_wrapper desktop">
            <img :src="user.avatar" />
            <div class="header_login">
              <span> {{ user.name }} </span>
              <p>
                {{ user.balance }}
              </p>
            </div>
          </router-link>
          <div class="dropdown-icon_wrapper" @click="isDropdownOpen = !isDropdownOpen">
            <img
              svg-inline
              class="icon dropdown-icon"
              src="@/assets/icons/btm-black.svg"
              alt="example"
            />
          </div>
          <div class="dropdown" v-if="isDropdownOpen" v-click-outside="() => {isDropdownOpen = false}">
            <ul>
              <li>
                <router-link to="/account"><span>Аккаунт</span></router-link>
              </li>
              <li @click="logout"><span>Выйти</span></li>
            </ul>
          </div>
        </template>
        <div class="header_util_style header_login-button desktop" v-else>
          <span @click="isLoginModalOpen = true">Войти</span>
        </div>

        <button class="hamburger hamburger--spin header_menu-button" @click="toggleMenu()" :class="{ 'is-active': isMenuActive }">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <div class="header_menu_wrapper" :class="{active: isMenuActive}">
          <div class="full-bg" @click="onBgClick()" :class="{active: isMenuActive}"></div>
          <div class="header_menu_slider">
            <div class="header_menu">
              <ul class="header_menu_list">
                <li>
                  <a @click.prevent="goToLink('/')" href="/" :class="{header_main_active: $route.path == '/'}">Главная</a>
                </li>
                <li>
                  <a @click.prevent="goToLink('/about')" href="/about" :class="{header_main_active: $route.path == '/about'}">О нас</a>
                </li>
                <li>
                  <a @click.prevent="goToLink('/rules')" href="/rules" :class="{header_main_active: $route.path == '/rules'}">Правила</a>
                </li>
              </ul>
              <div class="header_menu_footer">
                <a class="header_util_container header_search">
                  <img
                    svg-inline
                    class="icon header_util_img svg-stroke-color"
                    src="@/assets/icons/search.svg"
                    alt="example"
                  />
                  <span class="header_util_style"> Поиск </span>
                </a>
                <div class="header_menu_account-lang">
                  <router-link to="/account" class="header_login_wrapper" v-if="isLoggedIn">
                    <img src="@/static/images/profile-mini.png" />
                    <div class="header_login">
                      <span> Александр </span>
                      <p>136 ₽</p>
                    </div>
                  </router-link>
                  <div class="header_menu_log login" v-else>
                    <span @click="isLoginModalOpen = true; isMenuActive = false">Войти</span>
                  </div>
                  <a class="header_util_container header_lang" @click="changeLang()">
                    <img
                      svg-inline
                      class="icon header_util_rus"
                      :src="`/svg/${locale}.svg`"
                      alt="example"
                    />
                  </a>
                </div>
                <div class="header_menu_log" @click="logout" v-if="isLoggedIn"><span>Выйти</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="header_util_container header_lang desktop" @click="changeLang()">
        <img
          svg-inline
          class="icon header_util_rus"
          :src="`/svg/${locale}.svg`"
          alt="example"
        />

        <!-- <img
          svg-inline
          class="icon"
          src="@/assets/icons/btm-black.svg"
          alt="example"
        /> -->
      </a>
    </div>

    <transition name="fade" mode="out-in">
      <div class="login-modal" v-if="isLoginModalOpen" :key="1" @click="isLoginModalOpen = false">
        <div class="login-modal__card" @click.stop>
          <button class="login-modal__close-button" @click="isLoginModalOpen = false"></button>
          <h2 class="login-modal__title">Войти</h2>
          <div class="login-modal__social-buttons">
            <a class="link" :href="`${apiUrl}/api/auth/vkontakte`">
              <img
                svg-inline
                class="icon svg-path-color"
                src="@/assets/icons/vk.svg"
                alt="example"
              />
            </a>
            <a class="link" :href="`${apiUrl}/api/auth/google`">
              <img
                svg-inline
                class="icon svg-path-color"
                src="@/assets/icons/vk.svg"
                alt="example"
              />
            </a>
            <a class="link" :href="`${apiUrl}/api/auth/facebook`">
              <img
                svg-inline
                class="icon svg-path-color"
                src="@/assets/icons/facebook.svg"
                alt="example"
              />
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: "Header",

  data () {
    return {
      isSearchActive: false,
      searchInput: '',
      isDropdownOpen: false,
      isMenuActive: false,
      isLoginModalOpen: false
    }
  },

  mounted() {
    this.$root.$on('auth', () => {
      this.isLoginModalOpen = true;
    })
  },

  computed: {
    ...mapState(['user', 'locale']),

    isLoggedIn() {
      return this.user ? true : false;
    },

    apiUrl() {
      return process.env.VUE_APP_API_URL;
    }
  },

  methods: {
    ...mapMutations(['removeUser', 'setLocale']),
    ...mapActions(['getParticipants']),

    search() {

    },

    changeLang() {
      if (this.$i18n.locale == 'RU') this.setLocale('EN');
      else if (this.$i18n.locale == 'EN') this.setLocale('RU');
    },

    goToLink(link) {
      this.isMenuActive = false;
      this.$router.push('/');
      this.$router.push(link);
    },

    logout() {
      localStorage.removeItem('auth_token');
      this.removeUser();
      this.getParticipants();
    },

    toggleMenu() {
      if(this.isMenuActive)
        this.closeMenu();
      else this.openMenu();
    },

    openMenu() {
      this.isMenuActive = true;
    },

    closeMenu() {
      this.isMenuActive = false;
    },

    onBgClick() {
      this.closeMenu();
    }
  }
};
</script>
