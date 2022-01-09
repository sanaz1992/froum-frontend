import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register'
import Login from '../views/auth/Login'
import SingleThread from "@/views/thread/SingleThread";
import CreateThread from "@/views/thread/CreateThread";
import {checkAuth} from "@/requests/Auth";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: localStorage.getItem('isAuth')==='false' ? Register : Home
    },
    {
        path: '/login',
        name: 'Login',
        component: localStorage.getItem('isAuth')==='false' ? Login : Home
    },
    {
        path: '/thread/store',
        name: 'Create Thread',
        component: CreateThread
    },
    {
        path: '/thread/:slug',
        name: 'Single Thread',
        component: SingleThread
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
