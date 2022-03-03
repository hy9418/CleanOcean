// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "./utils/http";

import App from "./App.vue";
import router from "./router";
import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);
Vue.use(VueAxios, axios);

const NavbarStore = {
  showNavbar: false
};

// if (process.env.NODE_ENV === "development") {
//   const { mockXHR } = require("./mock");
//   mockXHR();
// }

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
