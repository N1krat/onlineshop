import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from './features/auth/Register.vue'
import LoginPage from './features/auth/Login.vue'
import HomePage from './pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    }
  ],
})
console.log('App loaded!')
export default router