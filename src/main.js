import 'babel-polyfill';
import 'core/global';
import 'core/const';
import Vue from 'vue';
import router from './router/';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons';
import Preview from 'components/photo-preview';

var opts = {
    mainClass: 'pswp--minimal--dark',
    barsSize: {
        top: 0,
        bottom: 0
    },
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false,
};
Vue.use(Preview, opts);
Vue.use(ElementUI);

new Vue({
    router
}).$mount('#app');
