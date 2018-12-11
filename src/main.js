
import Vue from 'vue';
import router from './router';
import App from './App';
Vue.config.productionTip = false;
import VueResource from "vue-resource";
//-将所有组件注册
Vue.use(VueResource);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


