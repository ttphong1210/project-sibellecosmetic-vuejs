<template>
  <div class="col-lg-3">
    <div class="left_sidebar_area">
      <aside class="left_widgets p_filter_widgets">
        <div class="l_w_title" id="categoryDropdown">
          <h3>Danh mục sản phẩm</h3>
        </div>
        <div class="widgets_inner" aria-labelledby="categoryDropdown">
          <ul class="list">
            <li v-for="cate in categories" :key="cate.cate_id">
              <a
                :href="
                  '/category/' + cate.cate_id + '/' + cate.cate_slug + '.html'
                "
                >{{ cate.cate_name }}</a
              >
            </li>
          </ul>
        </div>
      </aside>

      <aside class="left_widgets p_filter_widgets">
        <div class="l_w_title" id="brandDropdown">
          <h3>Thương hiệu sản phẩm</h3>
        </div>
        <div class="widgets_inner" aria-labelledby="brandDropdown">
          <ul class="list">
            <li v-for="brand in brands" :key="brand.brand_id">
              <a
                :href="
                  '/brand/' + brand.brand_id + '/' + brand.brand_slug + '.html'
                "
                >{{ brand.brand_name }}</a
              >
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import api from "@/axios.js";

export default {
  data() {
    return {
      categories: [],
      brands: [],
    };
  },
  async mounted() {
    await this.fetchData("category");
    await this.fetchData("brand");
  },
  methods: {
    async fetchData(type) {
      try {
        const response = await api.get(type);
        if (response.data) {
          if (type === "category") {
            this.categories = response.data;
          } else if (type === "brand") {
            this.brands = response.data;
          }
        }
      } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu ${type}:`, error);
        alert(`Có lỗi xảy ra khi lấy dữ liệu ${type}. Vui lòng thử lại sau.`);
      }
    },
  },
};
</script>
