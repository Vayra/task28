// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const L = require('leaflet')
const accessToken = 'pk.eyJ1IjoidmF5cmEiLCJhIjoiY2p0cGhyb2UwMDJ2bzQ0bzc2bmUxYXgwYiJ9.bzvNNOssxSGv4BwarWO9Bw'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

let oslo = [59.9139, 10.7522]
let loc = [60.10, 9.58]
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    map: null,
    tileLayer: null,
    layers: [
      {
        id: 0,
        name: 'Capitals',
        active: false,
        features: []
      }
    ],
    position: [],
    time: 'current' /* current, tomorrow, long */
  },
  router,
  template: `<App 
  @updatePosition="updatePosition"
  @resetPosition="resetPosition"
  @updateTime="updateTime"/>`,
  components: { App },
  mounted() {
    this.initMap()
    this.initLayers()
  },
  methods: {
    initMap() {
      this.map = L.map('mapid').setView([loc[0], loc[1]], 8)
      this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: accessToken
      })
      this.tileLayer.addTo(this.map)
    },
    initLayers() { },
    updatePosition(loc){
      console.log('updatePosition event handled')
      this.position = loc
    },
    resetPosition(){
      console.log('resetting position')
      this.position = loc
      this.map.setView(loc, 5)
    },
    updateTime(time){
      this.time = time;
    }
  },
  watch: {
    position () {
      this.map.flyTo(this.position)
    }
  }
})

