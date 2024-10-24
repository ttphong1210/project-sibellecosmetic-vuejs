<template>
  <div>
    <h1>Product List</h1>
    <div class="row">
            <div v-for="item in products" :key="item.prod_id" class="col-lg-3 col-md-6">
              <div class="single-product card-product">
                <form>
                  <input type="hidden" :value="item.prod_id" :class="'product_favorite_id_' + item.prod_id">
                  <input type="hidden" :value="item.prod_name" :class="'product_favorite_name_' + item.prod_id">
                  <input type="hidden" :value="item.prod_img" :class="'product_favorite_image_'+ item.prod_id">
                  <input type="hidden" :value="item.prod_price" :class="'product_favorite_price_'+ item.prod_id">
                  <div class="product-img">
                    <img class="card-img" :src="'http://127.0.0.1:8000/storage/avatar/' + item.prod_img" alt="" />
                    <div class="p_icon">
                      <a :href="'detail/' + item.prod_id +'/'+item.prod_slug+'.html'">
                        <i class="ti-eye icon-style"></i>
                      </a>
                      <a class="icon-ti-heart ti-heart-favorite" :data-id="item.prod_id">
                        <i class=" ti-heart icon-style"></i>
                      </a>
                      <a href="#" :data-url="'cart/add/'+ item.prod_id" class="add-to-cart">
                        <i class="ti-shopping-cart icon-style"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                  <a :href="'/detail/' + item.prod_id + '/' + item.prod_slug + '.html'" class="d-block">
                      <h4>{{item.prod_name}}</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">{{ new Intl.NumberFormat('vi-VN').format(item.prod_price) }} VND</span>
                      <del><small>{{new Intl.NumberFormat('vi-VN').format(item.prod_promotion) }} VND</small></del>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
    
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },
  },
};
</script>
