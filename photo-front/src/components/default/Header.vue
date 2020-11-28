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
      <a class="header_main_active"> Главная </a> <a> Топы </a> <a> Архив </a>
      <a> О нас </a> <a> Правила </a>
    </div>
    <div class="header_util">
      <a class="header_util_container">
        <img
          svg-inline
          class="icon header_util_img svg-stroke-color"
          src="@/assets/icons/search.svg"
          alt="example"
        />
        <span class="header_util_style"> Поиск </span>
      </a>
      <a class="header_util_style header_login_wrapper">
        <img src="@/static/images/profile-mini.png" />
        <div class="header_login">
          <span> Александр </span>
          <p>136 ₽</p>
        </div>
        <img
          svg-inline
          class="icon"
          src="@/assets/icons/btm-black.svg"
          alt="example"
        />
      </a>
      <a class="header_util_container">
        <img
          svg-inline
          class="icon header_util_rus"
          src="@/assets/icons/rus.svg"
          alt="example"
        />

        <img
          svg-inline
          class="icon"
          src="@/assets/icons/btm-black.svg"
          alt="example"
        />
      </a>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header"
};
</script>
