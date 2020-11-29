<template>
  <footer>
    <div class="footer_logo">
      <a class="header_logo_img">
        <!-- <img src=""> -->
        Лого
      </a>
      <a class="header_logo_text"> Топовые фото-конкурсы </a>
    </div>
    <div class="footer_links">
      <router-link to="/">Главная</router-link>
      <router-link to="/about">О нас</router-link>
      <router-link to="/rules">Правила</router-link>
    </div>
    <div class="footer_socials">
      <a>
        <img
          svg-inline
          class="icon svg-path-color"
          src="@/assets/icons/vk.svg"
          alt="example"
        />
      </a>
      <a>
        <img
          svg-inline
          class="icon svg-path-color"
          src="@/assets/icons/facebook.svg"
          alt="example"
        />
      </a>
      <a>
        <img
          svg-inline
          class="icon svg-path-color"
          src="@/assets/icons/instagram.svg"
          alt="example"
        />
      </a>
      <a>
        <img
          svg-inline
          class="icon svg-path-color"
          src="@/assets/icons/youtube.svg"
          alt="example"
        />
      </a>
    </div>
    <div class="footer_rights">Топовые фото-конкурсы © 2020</div>
  </footer>
</template>
