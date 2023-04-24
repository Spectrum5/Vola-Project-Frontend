import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store';

// Public Pages

import AppWelcome from './views/public/AppWelcome.vue';
import HomeSearch from './views/pages/HomeSearch.vue';

// Authentication Pages
import AppLogin from './views/auth/AppLogin.vue';
import AppRegister from './views/auth/AppRegister.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Public Pages
        {
            path: '/',
            name: 'Welcome',
            component: AppWelcome
        },
        // Authentication Pages
        {
            path: '/login',
            name: 'login',
            component: AppLogin,
            beforeEnter: (to, from) => {
                if (store.user != null) return { name: 'home' }
            },
        },
        {
            path: '/register',
            name: 'register',
            component: AppRegister,
            beforeEnter: (to, from) => {
                if (store.user != null) return { name: 'home' }
            },
        },
        {
            path: '/search',
            name: 'search',
            component: HomeSearch
        },
    ]
});

export { router };