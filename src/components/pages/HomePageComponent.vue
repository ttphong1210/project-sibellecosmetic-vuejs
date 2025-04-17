<template>
  <HeaderComponent />
  <main>
    <router-view />
  </main>
  <FooterComponent />
</template>
<script>
import FooterComponent from "../FooterComponent.vue";
import HeaderComponent from "../HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
<style>
/* Import custom CSS file */
@import "@/assets/css/style.css";
@import "@/assets/css/bootstrap.css";
@import "@/assets/css/fonts/themify-icons.css";
</style>
