import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Home.vue'
import LoginPage from '../features/auth/Login.vue'
import RegistrationPage from '../features/auth/Register.vue'
import CataloguePage from '../pages/Catalogue.vue'
import ProductPage from '../pages/Product.vue'

import UserPage from '../pages/User.vue'
import CartPage from '../pages/Cart.vue'

import Admin from '../pages/Admin/Admin.vue'
import AdminProducts from '../pages/Admin/AdminProducts.vue'
import AdminUsers from '../pages/Admin/AdminUsers.vue'
import AdminOrders from '../pages/Admin/AdminOrders.vue'


const routes = [
    {
        path: '/',            
        name: 'HomePage',
        component: HomePage,
    },
    { 
        path: '/catalogue',
        name: 'Catalogue',
        component: CataloguePage,
    },
    { 
        path: '/product/:id',
        name: 'Product',
        component: ProductPage,
    },
    { 
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    { 
        path: '/register',
        name: 'Register',
        component: RegistrationPage
    },
    { 
        path: '/user/:username',
        name: 'User',
        component: UserPage
    }, 
    {
        path: '/cart',
        name: 'Cart',
        component: CartPage
    },
    { 
        path: '/admin',
        component: Admin,
        children: [
            {
                path: 'products',
                component: AdminProducts
            }, 
            { 
                path: 'users',
                component: AdminUsers
            }, 
            { 
                path: 'orders',
                component: AdminOrders
            }
        ]
    },
    
]; 


const router = createRouter({
    history: createWebHistory(),
    routes,
}); 

export default router
    

