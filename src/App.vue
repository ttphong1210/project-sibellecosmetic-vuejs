<template>
  <HeaderComponent />
  <ProductFeaturedComponent />
  <ProductList/>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ProductFeaturedComponent from './components/ProductFeaturedComponent.vue';
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ProductFeaturedComponent,
    ProductList
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
