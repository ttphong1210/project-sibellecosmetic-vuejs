<template>
  <section class="banner_area">
    <div class="banner_inner d-flex align-items-center">
      <div class="container">
        <div
          class="banner_content d-md-flex justify-content-between align-items-center"
        >
          <div class="mb-3 mb-md-0">
            <h2>Tất cả sản phẩm</h2>
            <!-- <p style="font-size: 14px;">Tại Si.Belle bạn sẽ được: <br>

            Chia sẻ kiến thức chăm sóc da theo từng độ tuổi.<br>
            Tư vấn quy trình dưỡng da phù hợp theo nhu cầu.<br>
            Cam kết hàng chính hãng đã qua kiểm nghiệm và chọn lọc.</p> -->
          </div>
          <!-- <div class="page_link">
          <a href="{{route('home')}}">Home</a>
          <a href="category.html">Shop</a>
          <a href="category.html">Women Fashion</a>
        </div> -->
        </div>
      </div>
    </div>
  </section>
  <!--================End Home Banner Area =================-->

  <!--================Category Product Area =================-->
  <section class="cat_product_area section_gap">
    <div class="container">
      <div class="row">

        <SidebarFilterComponent/>

        <div class="col-lg-9">
          <div class="product_top_bar">
            <div class="left_dorp">
              <select class="sorting" id="sort">
                <option value="{{Request::url()}}?sort_by=none">
                  Sắp xếp theo...
                </option>
                <option value="{{Request::url()}}?sort_by=gia_tang_dan">
                  Giá tăng dần...
                </option>
                <option value="{{Request::url()}}?sort_by=gia_giam_dan">
                  Giá giảm dần...
                </option>
              </select>
            </div>
          </div>

          <div class="latest_product_inner">
            <div v-if="products && products.length > 0" class="row">
              <div
                v-for="item in products"
                :key="item.prod_id"
                class="col-lg-4 col-md-6"
              >
                <div class="single-product card-product">
                  <input
                    type="hidden"
                    :value="item.prod_id"
                    :class="'product_favorite_id_' + item.prod_id"
                  />
                  <input
                    type="hidden"
                    :value="item.prod_name"
                    :class="'product_favorite_name_' + item.prod_id"
                  />
                  <input
                    type="hidden"
                    :value="item.prod_img"
                    :class="'product_favorite_image_' + item.prod_id"
                  />
                  <input
                    type="hidden"
                    :value="item.prod_price"
                    :class="'product_favorite_price_' + item.prod_id"
                  />
                  <div class="product-img">
                    <img
                      class="card-img"
                      :src="getProductAvatar(item.prod_img)
                     
                      "
                      alt=""
                    />
                    <div class="p_icon">
                      <a
                        :href="
                          'detail/' +
                          item.prod_id +
                          '/' +
                          item.prod_slug +
                          '.html'
                        "
                      >
                        <i class="ti-eye icon-style"></i>
                      </a>
                      <a
                        class="icon-ti-heart ti-heart-favorite"
                        :data-id="item.prod_id"
                      >
                      <i
                      class="ti-heart icon-style"
                      @click="clickToggleFavorite(item)"
                      :class="
                        findItemFavorite(item) ? 'favorite-active' : ''
                      "
                    ></i>
                      </a>
                      <a
                        href="#"
                        @click.prevent="actionAddToCart(item)"
                        class="add-to-cart"
                      >
                        <i class="ti-shopping-cart icon-style"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                    <a
                      :href="
                        '/detail/' +
                        item.prod_id +
                        '/' +
                        item.prod_slug +
                        '.html'
                      "
                      class="d-block"
                    >
                      <h4>{{ item.prod_name }}</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">{{
                        formatCurrency(item.prod_price)
                      }}</span>
                      <del
                        ><small>{{
                          formatCurrency(item.prod_promotion)
                        }}</small></del
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Không có sản phẩm nào!</p>
            </div>
            <!-- Pagination -->
            <div class="d-flex justify-content-end mt-3">
            <nav>
                <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Lùi</a>
                </li>
                <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === currentPage }"
                >
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Tiếp</a>
                </li>
                </ul>
            </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--================End Category Product Area =================-->
</template>
<script>
import api from "@/axios.js";
import favoriteProductMixins from "@/mixins/favoriteProductMixin";
import cartMixins from "@/mixins/cartMixins";
import SidebarFilterComponent from "../SidebarFilterComponent.vue";
import eventBus from "@/utils/eventBus";

export default {
  mixins: [favoriteProductMixins, cartMixins],
  components: {
    SidebarFilterComponent
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts(page = 1) {
      eventBus.emit('show-loading');
      try {
        const responseProducts = await api.get(`product/?page=${page}`);
        this.products = responseProducts.data.data;
        this.currentPage = responseProducts.data.current_page;
        this.totalPages = responseProducts.data.last_page;
      } catch (error) {
        console.error("Error fetch products", error);
      }finally{
        eventBus.emit('hide-loading');
      }
    },
    changePage(page){
      if(page >= 1 && page <= this.totalPages){
        this.fetchProducts(page);
      }
    }
  },
};
</script>
