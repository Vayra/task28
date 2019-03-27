// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const axios = require("axios");
const L = require("leaflet");
const accessToken =
  "pk.eyJ1IjoidmF5cmEiLCJhIjoiY2p0cGhyb2UwMDJ2bzQ0bzc2bmUxYXgwYiJ9.bzvNNOssxSGv4BwarWO9Bw";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

let oslo = [59.9139, 10.7522]
let loc = [60.10, 9.58]
/* eslint-disable no-new */
new Vue({
  el: "#app",
  data: {
    
    position: [],
    time: 'current' /* current, tomorrow, long */
  },
  router,
  
  template: `<App/>`, /* @updatePosition="updatePosition"
  @resetPosition="resetPosition"
  @updateTime="updateTime">*/
  components: { App },
  
  methods: {
    
  },
  watch: {
    
  }
})
