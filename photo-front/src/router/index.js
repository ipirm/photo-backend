import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store';

const Account = () => import(/* webpackChunkName: "account" */ '../pages/account.vue')
const Contest = () => import(/* webpackChunkName: "contest" */ '../pages/contest.vue')
const TextPage = () => import(/* webpackChunkName: "textPage" */ '../pages/_text-page.vue')
const Index = () => import(/* webpackChunkName: "index" */ '../pages/index.vue')


Vue.use(VueRouter)

// const ifNotAuthenticated = (to, from, next) => {
//     if (!store.getters['auth/isAuthenticated']) {
//         next()
//         return
//     }
//     next('/users')
// }

// const ifAuthenticated = (to, from, next) => {
//     if (store.getters['auth/isAuthenticated']) {
//         next()
//         return
//     }
//     next('/login')
// }


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/account',
            component: Account
        },
        {
            path: '/contest',
            component: Contest
        },
        {
            path: '/:name',
            component: TextPage,
            props: true,
            name: 'text-page'
        },
        {
            path: '/',
            component: Index,
            name: 'index'
        }
    ]
})


router.beforeEach(async (to, from, next) => {
    const authToken =  window.location.search.replace('?access_token=', '') || localStorage.getItem('auth_token');
    if (authToken) {
      localStorage.setItem('auth_token', authToken);
      await store.dispatch('getUser');
    }

    next();
});


export default router