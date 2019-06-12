import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App';

Vue.use(VueRouter);

// 首页
const Home = r => require.ensure([], () => r(require('../views/home/home')), 'home');

const routes = [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [{
        path: '/',
        component: Home,
        meta: {
            title: '首页'
        }
    }, {
        path: '*',
        redirect: '/'
    }],
    hashbang: false
}];

const router = new VueRouter({
    routes,
    mode: 'hash',
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: from.meta.savedPosition || 0 };
        }
    }
});


export default router;
