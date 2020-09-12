import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import modules from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
    modules
});

new Vue({
    render: h => h(App),
    store
}).$mount('#app');
