
import { createRouter, createWebHistory } from "vue-router"
import  account_customer from "../router/account_customer.js"
import  home from "../router/home.js"
// import LoginCustomerComponent from "../components/pages/accountCustomer/LoginComponent.vue"

const routes = [...account_customer, ...home];

const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Si Belle Cosmetics'; // Đặt tiêu đề mặc định nếu không có meta
    next();
  });
  
export default router;