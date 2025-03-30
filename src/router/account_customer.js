import LoginComponent from "../components/pages/accountCustomer/LoginComponent.vue"

const account_customer = [
    {
        path: '/accounts',
        children:[
            {
                path: 'login-customer',
                name: 'login-customer',
                component: LoginComponent,
            }
        ]
    }
];

export default account_customer;