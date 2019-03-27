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
    info: null,
    forecastString: null,
    city: 'Oslo',
    map: null,
    tileLayer: null,
    layers: [
      {
        id: 0,
        name: "Cities",
        active: false,
        features: [
          {
            id: 0,
            name: 'Oslo',
            type: 'marker',
            coords: [59.9139, 10.7522],
          }
        ],
        
      }

    ],
    position: [],
    time: 'current' /* current, tomorrow, long */
  },
  router,
  created() {
    axios
    .get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.city + '&APPID=4c3e7f6505140a61cdeee7719f798c32')
    .then((result) => {
      this.info = result.data
  
      this.forecastString = "City: " + (this.info.city.name) + "\n\nToday at " + ((this.info.list[0].dt_txt).substring(11)) + "\nTemperature: " + 
      ((this.info.list[0].main.temp - 272.15).toFixed(1)) + " Degrees Celsius" + "\n" + 
      (this.info.list[0].weather[0].description) + "\n \nTomorrow at " + ((this.info.list[8].dt_txt).substring(11))+"\nTemperature: " + 
      ((this.info.list[8].main.temp - 272.15).toFixed(1)) + " Degrees Celcius" + "\n" + 
      (this.info.list[8].weather[0].description) + "\n \n" + ((this.info.list[16].dt_txt))+"\nTemperature: " + 
      ((this.info.list[16].main.temp - 272.15).toFixed(1)) + " Degrees Celcius" + "\n" + 
      (this.info.list[16].weather[0].description) + "\n \n" + ((this.info.list[24].dt_txt))+"\nTemperature: " + 
      ((this.info.list[24].main.temp - 272.15).toFixed(1)) + " Degrees Celcius" + "\n" + 
      (this.info.list[24].weather[0].description) + "\n \n" + ((this.info.list[32].dt_txt))+"\nTemperature: " + 
      ((this.info.list[32].main.temp - 272.15).toFixed(1)) + " Degrees Celcius" + "\n" + 
      (this.info.list[32].weather[0].description)

      console.log(this.forecastString)
    })
    .catch(error => console.log(error.response))
  },
  template: `<App 
  @updatePosition="updatePosition"
  @resetPosition="resetPosition"
  @updateTime="updateTime"
  @layerChanged="layerChanged"/>`,
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
    },
    layerChanged(active){
        this.layers[0].active = active
    }
  },
  watch: {
    position () {
      this.map.flyTo(this.position)
    }
  }
})
