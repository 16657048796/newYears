import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueComponsitionApi from '@vue/composition-api';
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(VueComponsitionApi)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
