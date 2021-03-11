import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    // Login
    {
        path: '/',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/DashboardLogin.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "Index" */ '../views/DashboardIndex.vue'),
        children: [
            // Dashboard
            {
                path: '',
                name: 'Dashboard',
                component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue')
            },
            // Editar
            {
                path: '/editar/:_id',
                name: 'Editar',
                component: () => import(/* webpackChunkName: "Editar" */ '../views/DashboardEditar.vue')
            },
            // Craer
            {
                path: '/nuevo',
                name: 'Nuevo',
                component: () => import(/* webpackChunkName: "Nuevo" */ '../views/DashboardNuevo.vue')
            }    
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
