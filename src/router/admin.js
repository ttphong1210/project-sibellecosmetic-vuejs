import AdminPageComponent from '@/components/admin-page/AdminPageComponent.vue'
import ListProductComponent from '@/components/admin-page/products/ListProductComponent.vue'
import FormAddProductComponent from '@/components/admin-page/products/FormAddProductComponent.vue'
import LoginAuthenticationComponent from '@/components/admin-page/LoginAuthenticationComponent.vue';
import ForgotPasswordComponent from '@/components/admin-page/ForgotPasswordComponent.vue';
import SearchProductComponent from '@/components/admin-page/products/SearchProductComponent.vue';


const admin = [
    {
        path: "/login-auth.html",
        component: LoginAuthenticationComponent,
        meta: {title: 'Đăng nhập Admin'}
    },
    {
        path: "/forgot-password.html",
        component: ForgotPasswordComponent,
        meta: {title: 'Quên mật khẩu'}
    },
{
    path: "/admin",
    component: AdminPageComponent,
    children: [
        {
            path: "products.html",
            component: ListProductComponent,
            meta: {title: 'Admin | Danh sách sản phẩm'}
        },
        {
            path: "search",
            component: SearchProductComponent,
            meta: {title: 'Admin | Danh sách sản phẩm'}
        },
        {
            path: "form-add-products.html",
            component: FormAddProductComponent,
            meta: {title: 'Admin | Danh sách sản phẩm'}
        },
    ]
}
];
export default admin;