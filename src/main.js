import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import iziToast from "izitoast";

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   axios.defaults.headers.common["Authorization"] =
//     "token" + localStorage.getItem("token");
//   next();
// });

var eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;
Vue.prototype.$axios = axios;
Vue.prototype.$iziToast = iziToast;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
// createApp(App).use(router,axios).mount('#app')
/**]
 * Get token for authorizatin
 */
const getToken = localStorage.getItem("token");
/* console.log(getToken);
if (getToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;

  Authorization: `Bearer ${localStorage.getItem("token")}`
} */

/* export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000"
}); */

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
