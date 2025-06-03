
import { createRouter, createWebHistory } from "vue-router"
import  home from "../router/home.js"
import admin from "./admin.js";

const routes = [...home, ...admin];

const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Si Belle Cosmetics'; // Đặt tiêu đề mặc định nếu không có meta
    // next();

    const isLoggedIn = localStorage.getItem('auth_token') !== null;
    if(to.meta.requiresAuth && isLoggedIn){
      next({
        path: '/login_auth.html',
        query: {redirect: to.fullPath}
      });
    }else{
      next();
    }
    // if(to.meta.requiresAuth){
    //   try {
    //     if(!store.getters.isAuthenticated){
    //       store.dispatch('checkAuth');
    //     }

    //     return next();

    //   } catch (error) {
    //     if(error.response){
    //       alert(error.response.message);
    //     }
    //     return next({
    //       path: '/login-auth.html',
    //       query: {redirect: to.fullPath},
    //     });
    //   }
    // }
  });
  
export default router;