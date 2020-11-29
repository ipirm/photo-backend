<template>
  <header>
    <div class="header_logo">
      <a class="header_logo_img" href="contest.html">
        <!-- <img src="">  -->
        Лого
      </a>
      <a class="header_logo_text"> Топовые фото-конкурсы </a>
    </div>
    <div class="header_main">
      <router-link to='/' :class="{header_main_active: $route.path == '/'}">Главная</router-link>
      <router-link to="/about" :class="{header_main_active: $route.path == '/about'}">О нас</router-link>
      <router-link to="/rules" :class="{header_main_active: $route.path == '/rules'}">Правила</router-link>
    </div>
    <div class="header_util">
      <a class="header_util_container header_search desktop">
        <img
          svg-inline
          class="icon header_util_img svg-stroke-color"
          src="@/assets/icons/search.svg"
          alt="example"
        />
        <span class="header_util_style"> Поиск </span>
      </a>
      <div class="header_util_container header_util_style header_login_container">
        <template v-if="isLoggedIn">
          <router-link to="/account" class="header_login_wrapper desktop">
            <img src="@/static/images/profile-mini.png" />
            <div class="header_login">
              <span> Александр </span>
              <p>136 ₽</p>
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
          <div class="dropdown" v-if="isDropdownOpen">
            <ul>
              <li>
                <router-link to="/account"><span>Аккаунт</span></router-link>
              </li>
              <li @click="logout"><span>Выйти</span></li>
            </ul>
          </div>
        </template>
        <div class="header_util_style header_login-button desktop" v-else>
          <span>Войти</span>
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
                  <router-link to='/' :class="{header_main_active: $route.path == '/'}">Главная</router-link>
                </li>
                <li>
                  <router-link to="/about" :class="{header_main_active: $route.path == '/about'}">О нас</router-link>
                </li>
                <li>
                  <router-link to="/rules" :class="{header_main_active: $route.path == '/rules'}">Правила</router-link>
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
                    <span>Войти</span>
                  </div>
                  <a class="header_util_container header_lang" @click="changeLang()">
                    <img
                      svg-inline
                      class="icon header_util_rus"
                      :src="require(`@/assets/icons/${lang}.svg`)"
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
          :src="require(`@/assets/icons/${lang}.svg`)"
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
  </header>
</template>
<script>
export default {
  name: "Header",

  data () {
    return {
      lang: 'ru',
      isLoggedIn: true,
      isDropdownOpen: false,
      isMenuActive: false
    }
  },

  methods: {
    changeLang() {
      if (this.lang == 'ru') this.lang = 'en';
      else if (this.lang == 'en') this.lang = 'ru';
    },

    logout() {
      this.isLoggedIn = false;
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
