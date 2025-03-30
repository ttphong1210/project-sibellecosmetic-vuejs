<template>
  <div class="header_area">
    <div class="top_menu">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="float-left">
              <p>Phone: 077 940 6396</p>
              <p>email: Si.Belle@gmail.com</p>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="float-right">
              <ul class="right_side">
                <li>
                  <a href=""> Quà tặng </a>
                </li>
                <li>
                  <a href="/tracking-order.html"> Theo dõi đơn hàng </a>
                </li>
                <li>
                  <a href=""> Liên hệ </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main_menu">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light w-100">
          <!-- Brand and toggle get grouped for better mobile display -->
          <a class="navbar-brand logo_h" href="/">
            <img
              :src="require('@/assets/img/Si.belle.jpeg')"
              alt=""
              style="width: 137px; height: 38px"
            />
          </a>
          <button
            id="navbar-toggler"
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div
            class="collapse navbar-collapse offset w-100"
            id="navbarSupportedContent"
          >
            <div class="row w-100 mr-0">
              <div class="col-lg-7 pr-0">
                <ul class="nav navbar-nav center_nav pull-right">
                  <li class="nav-item active">
                    <a class="nav-link" href="/">Trang chủ</a>
                  </li>
                  <li class="nav-item submenu dropdown">
                    <a
                      href=""
                      class="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >Sản phẩm</a
                    >
                    <ul class="dropdown-menu">
                      <li class="nav-item">
                        <a class="nav-link" :href="'/products.html'">
                          Tất cả sản phẩm</a
                        >
                      </li>
                      <li
                        v-for="cate in categories"
                        :key="cate.cate_id"
                        class="nav-item"
                      >
                        <a
                          class="nav-link"
                          :href="
                            '/category/' +
                            cate.cate_id +
                            '/' +
                            cate.cate_slug +
                            '.html'
                          "
                          >{{ cate.cate_name }}</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item submenu dropdown">
                    <a
                      href=""
                      class="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >Thương hiệu</a
                    >
                    <ul class="dropdown-menu">
                      <li
                        v-for="brand in brands"
                        :key="brand.brand_id"
                        class="nav-item"
                      >
                        <a
                          class="nav-link"
                          :href="
                            '/brand/' +
                            brand.brand_id +
                            '/' +
                            brand.brand_slug +
                            '.html'
                          "
                          >{{ brand.brand_name }}</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item submenu dropdown">
                    <a
                      href="#"
                      class="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >Blog</a
                    >
                    <ul class="dropdown-menu">
                      <li class="nav-item">
                        <a class="nav-link" href="">Quà tặng</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="">Kiến thức chăm sóc</a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="">Liên hệ</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-5 pr-0">
                <ul class="nav navbar-nav navbar-right right_nav pull-right">
                  <li class="nav-item">
                    <div class="icons form-search-icons">
                      <div class="form-search">
                        <input
                          v-model="searchQuery"
                          type="text"
                          placeholder="Tìm kiếm.."
                          id="input-search"
                          @keydown.enter="goToSearchResults"
                          style="border: none; outline: none"
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    id="list-product-minicart"
                    class="nav-item submenu dropdown">
                    <MiniCart/>
                </li>
                <li id="user-account" class="nav-item submenu dropdown">
                    <a
                      href="/accounts/login-customer" class="icons">
                      <i class="ti-user" aria-hidden="true"></i>
                    </a>
                    <ul class="dropdown-menu-user show-menu-login">
                        <li class="nav-link">
                            <a href="#" style="color: black;"> Chào Name </a>
                        </li>
                        <li class="nav-link">
                            <a href="{{asset('account/logout-customer')}}" style="color: black;">Logout</a>
                        </li>
                    </ul>
                  </li>
                  <li id="favorite-product" class="nav-item">
                    <a href="/favorite.html" class="icons">
                      <i class="ti-heart" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import MiniCart from "./pages/shoppingCart/MiniCart.vue";
import api from "@/axios";
// import MiniCart from "./MiniCart.vue";

export default {
  name: "HeaderComponent",
  components: {
    MiniCart
  },
  data() {
    return {
      categories: [],
      brands: [],
      searchQuery: ""
    };
  },
  created() {
    this.fetchCategory();
    this.fetchBrand();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await api.get("category");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching data", error);
        alert("Có lỗi xảy ra khi lấy dữ liệu thể loại. Vui lòng thử lại sau.");
      }
    },

    async fetchBrand() {
      try {
        const response = await api.get("brand");
        this.brands = response.data;
      } catch (error) {
        console.error("Error fetching data", error);
        alert(
          "Có lỗi xảy ra khi lấy dữ liệu thương hiệu. Vui lòng thử lại sau. "
        );
      }
    },
    goToSearchResults(){
      this.$router.push({path: "/search", query:{
        result: this.searchQuery
      }});
    },

  },
};
</script>
<style scoped>
.nav-item.submenu .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  display: none;
}
.nav-item.submenu:hover .dropdown-menu {
  display: block;
}
.dropdown-menu li {
  list-style: none;
}

.dropdown-menu li a {
  padding: 10px 15px;
  display: block;
}

.icons {
  padding: 0 10px;
  font-size: 18px;
}
/* Form tìm kiếm */
.form-search-icons {
  position: relative;
}

.form-search input {
  padding: 5px 10px;
  border-radius: 15px;
}

.show-menu-login {
  display: none;
  position: absolute;
  background: white;
  width: 150px;
  border: 1px solid #ddd;
  z-index: 100;
  top: 40px;
}

#user-account:hover .show-menu-login {
  display: block;
}
.float-right ul>li{
  margin:  0;
}
  @media (max-width: 992px) {
  .navbar-collapse {
    flex-direction: column;
  }

  .right_nav {
    justify-content: flex-end;
  }

  .form-search {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }
  .top_menu {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar-toggler {
    border: none;
    background-color: transparent;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .navbar-toggler-icon {
    background-color: #333;
    display: block;
    width: 25px;
    height: 3px;
    margin: 4px auto;
  }

  .right_nav.pull-right {
    justify-content: center;
  }
}
</style>
