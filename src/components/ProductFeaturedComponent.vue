<template>
  <!--================ Feature Product Area =================-->
  <section class="feature_product_area section_gap_bottom_custom">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="main_title">
            <h2><span>Sản Phẩm Nổi bật</span></h2>
          </div>
        </div>
      </div>
      <div id="navigation-bar">
        <button id="prev-btn" class="nav-btn">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </button>
        <button id="next-btn" class="nav-btn">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
      <swiper
      :centeredSlides="true" 
      :slides-per-view="4" 
      :navigation="{
        nextEl: '#next-btn',
        prevEl: '#prev-btn'
      }" 
      :pagination="false" 
      :loop="true">
        <swiper-slide v-for="item in products_featured" :key="item.prod_id" class="col-md-3">
          <div class="single-product">
                <form enctype="multipart/form-data">
                  <input type="hidden" :value="item.prod_id"  :class="'product_favorite_id_' + item.prod_id"/>
                  <input type="hidden" :value="item.prod_name" :class="'product_favorite_name_' + item.prod_id" />
                  <input  type="hidden" :value="item.prod_img" :class="'product_favorite_image_' + item.prod_id" />
                  <input type="hidden" :value="item.prod_price" :class="'product_favorite_price_'+item.prod_id"  />
                  <div class="product-img">
                    <img class="img-fluid" :src="'http://127.0.0.1:8000/storage/avatar/' + item.prod_img" alt=""/>
                    <div class="p_icon">
                      <a :href="'detail/' + item.prod_id + '/'+item.prod_slug + '.html'" >
                        <i class="ti-eye icon-style"></i>
                      </a>
                      <a class="icon-ti-heart ti-heart-favorite" :data-id="item.prod_id">
                        <i class="ti-heart icon-style"></i>
                      </a>
                      <a href="#" :data-url="'cart/add/'+item.prod_id" class="add-to-cart"  >
                        <i class="ti-shopping-cart icon-style"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                    <a :href="'detail/' +item.prod_id + '/'+item.prod_slug+'.html'" class="d-block">
                      <h4>{{item.prod_name}}</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">{{ new Intl.NumberFormat('vi-VN').format(item.prod_price) }}VND</span>
                      <del><small>
                          {{ new Intl.NumberFormat('vi-VN').format(item.prod_promotion)
                          }}VND</small></del>
                    </div>
                  </div>
                </form>
              </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <!--================ End Feature Product Area =================-->
</template>
<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

export default{
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
        return {
            products_featured: [],
        };
    },
    created(){
        this.fetchProductsFeatured();
    },
    methods: {
        async fetchProductsFeatured(){
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/productfeatured");
                this.products_featured = response.data;
            }catch (error){
                console.error("Error fetching data", error);
                alert("Có lỗi xảy ra khi lấy dữ liệu sản phẩm. Vui lòng thử lại sau.");
            }
        },
    },
};
</script>
<style>
</style>
