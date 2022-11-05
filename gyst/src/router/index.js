import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/AboutPage.vue'
import Budget from '@/views/BudgetPage.vue'
import ToDoGoals from '@/views/ToDoGoals.vue'
import Login from '@/views/LoginPage.vue'


const routes = [
    {
        path: "/",
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/budget',
        name: 'Budget',
        component: Budget
    },
    {
        path: '/todogoals',
        name: 'ToDoGoals',
        component: ToDoGoals
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router