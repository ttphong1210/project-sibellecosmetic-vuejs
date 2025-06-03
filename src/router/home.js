import HomeComponent from "../components/HomeComponent.vue";
import AllProductsComponent from "../components/pages/products/AllProductsComponent.vue";
import ShowCart from "../components/pages/shoppingCart/ShowCart.vue";
import CheckOutComponent from "../components/pages/checkout/CheckOutComponent.vue";
import ProductDetail from "../components/pages/products/ProductDetail.vue";
import ProductCategoryComponent from "@/components/pages/products/ProductCategoryComponent.vue";
import ProductBrandComponent from "@/components/pages/products/ProductBrandComponent.vue";
import ProductFavoriteComponent from "@/components/pages/products/ProductFavoriteComponent.vue";
import ProductSearchComponent from "@/components/pages/products/ProductSearchComponent.vue";
import TrackingOrderComponent from "@/components/pages/TrackingOrderComponent.vue";
import DetailTrackingOrderComponent from "@/components/pages/DetailTrackingOrderComponent.vue";
import HomePageComponentVue from "@/components/pages/HomePageComponent.vue";

const home = [
  {
    path: "/",
    component: HomePageComponentVue,
    children: [
      {
        path: "",
        component: HomeComponent,
        meta: { title: "Si Belle Cosmetics" },
      },
      {
        path: "/products.html",
        component: AllProductsComponent,
        meta: { title: "Si Belle Cosmetics | Sản phẩm" },
      },
      {
        path: "/category/:id/:slug.html",
        component: ProductCategoryComponent,
        meta: { title: "Si Belle Cosmetics | Thể loại" },
      },
      {
        path: "/brand/:id/:slug.html",
        component: ProductBrandComponent,
        meta: { title: "Si Belle Cosmetics | Thương hiệu" },
      },
      {
        path: "/detail/:id/:slug.html",
        component: ProductDetail,
        meta: { title: "Si Belle Cosmetics | Chi tiết sản phẩm" },
      },

      {
        path: "/cart/show.html",
        component: ShowCart,
        meta: { title: "Si Belle Cosmetics | Giỏ hàng" },
      },
      {
        path: "/favorite.html",
        component: ProductFavoriteComponent,
      },
      {
        path: "/search",
        component: ProductSearchComponent,
      },
      {
        path: "/checkout.html",
        component: CheckOutComponent,
        meta: { title: "Si Belle Cosmetics | Checkout" },
      },
      {
        path: "/tracking-order.html",
        component: TrackingOrderComponent,
        meta: { title: "Theo dõi đơn hàng" },
      },
      {
        path: "/detail-tracking-order",
        component: DetailTrackingOrderComponent,
        meta: { title: "Chi tiết đơn hàng" },
      },
    ],
  },
  
];

export default home;
