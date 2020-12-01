<template>
	<transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style lang="scss"> 
     @import "@/assets/scss/app.scss";
   @import "@/assets/scss/media.scss";
</style>