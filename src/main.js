import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import modules from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
    modules,
    plugins: [createPersistedState(
        {
            key: 'todo-list-data',
            fetchBeforeUse: true
        }
    )]
});

new Vue({
    render: h => h(App),
    store
}).$mount('#app');
