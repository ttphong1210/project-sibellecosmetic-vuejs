<template>
  <header class="app-header row">
    <div class="col-md-4">
      <!-- Sidebar toggle button-->
      <a
        class="app-sidebar__toggle"
        href="#"
        data-toggle="sidebar"
        aria-label="Hide Sidebar"
      ></a>
    </div>
    <div class="col-md-4">
      <!-- Search box -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          @keydown.enter="goToSearch"
          class="form-control"
          placeholder="Tìm kiếm..."
          style="width: 100%; max-width: 300px"
        />
      </div>
    </div>
    <div class="col-md-4">
      <!-- Navbar Right Menu-->
      <ul class="app-nav">
        <li>
          <a class="app-nav__item" @click.prevent="actionLogOut()"
            ><i class="bx bx-log-out bx-rotate-180"></i>
          </a>
        </li>
      </ul>
    </div>
  </header>
  <!-- Sidebar menu-->
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <div>
        <p class="app-sidebar__user-name"><b>Si Belle Cosmetic</b></p>
        <p class="app-sidebar__user-designation">Trang quản lý</p>
      </div>
    </div>
    <hr />
    <ul class="app-menu">
      <li>
        <a class="app-menu__item haha" href="phan-mem-ban-hang.html"
          ><i class="app-menu__icon bx bx-cart-alt"></i>
          <span class="app-menu__label">POS Bán Hàng</span></a
        >
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Bảng điều khiển</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Quản lý nhân viên</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Quản lý khách hàng</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/products.html" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Quản lý sản phẩm</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Quản lý đơn hàng</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Quản lý nội bộ</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Bảng kê lương</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Báo cáo doanh thu</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Lịch công tác</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="app-menu__item">
          <i class="app-menu__icon bx bx-purchase-tag-alt"></i>
          <span class="app-menu__label">Cài đặt hệ thống</span>
        </router-link>
      </li>
    </ul>
  </aside>
  <main class="app-content">
    <router-view :listCategory="listCategory" :listBrand="listBrand" />
  </main>
</template>
<script>
import api from "@/axios";
import eventBus from "@/utils/eventBus";

export default {
  data() {
    return {
      user: null,
      listCategory: [],
      listBrand: [],
      searchQuery: ""
    };
  },
  async mounted() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
    await this.fetchData("admin/category");
    await this.fetchData("admin/brand/list-brands");
  },
  methods: {
    async actionLogOut() {
      if (confirm("Bạn có chắc muốn đăng xuất ?")) {
        eventBus.emit("show-loading");
        try {
          const response = await api.get("/logout");
          this.message = response.data.message;
          localStorage.removeItem("user");
          this.$router.push("/login-auth.html");
        } catch (error) {
          console.log("Error Log Out", error);
        } finally {
          eventBus.emit("hide-loading");
        }
      }
    },
    async fetchData(type) {
      try{
        const response = await api.get(type);
        if (response.data) {
          if (type === "admin/category") {
            this.listCategory = response.data.listCategory;
          } else if (type === "admin/brand/list-brands") {
            this.listBrand = response.data.listBrands;
          }
        }
      }catch(error){
        console.log('Error', error);
      }
    },
    goToSearch() {
      this.$router.push({
        path: "search",
        query: {
          result: this.searchQuery,
        },
      });
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/admin-css/main.css";
/* .element-button .coll-sm-2{
    padding-left: 10px !important;
  } */
.search-bar {
  padding: 3px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
