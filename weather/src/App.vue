<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" class="bar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">My Vue App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-on:click="resetPosition()">Home</b-nav-item>
          <b-nav-item v-on:click="updatePosition([59.9139, 10.7522])">Oslo</b-nav-item>
          <b-nav-item v-on:click="updatePosition([60.3913, 5.3221])">Bergen</b-nav-item>
          <b-nav-item v-on:click="updatePosition([58.9700, 5.7331])">Stavanger</b-nav-item>
          <b-nav-item v-on:click="updatePosition([63.4305, 10.3951])">Trondheim</b-nav-item>
          <b-nav-item-dropdown extra-menu-classes="black" :text="time">
            <b-nav-item v-on:click="updateTime('Current')">Current</b-nav-item>
            <b-nav-item v-on:click="updateTime('Tomorrow')">Tomorrow</b-nav-item>
            <b-nav-item v-on:click="updateTime('LongTerm')">Long term</b-nav-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view/>
    <div class="weatherData black">
      <table class="table">
        <tr v-if="time==='Current'">
          <th>City</th>
          <th>Today</th>
        </tr>
        <tr v-else-if="time==='Tomorrow'">
          <th>City</th>
          <th>Tomorrow</th>
        </tr>
        <tr v-else>
          <th>City</th>
          <th>Today</th>
          <th>Tomorrow</th>
          <th>3 days</th>
          <th>4 days</th>
          <th>5 days</th>
        </tr>

        <tr v-for="forecast in forecastArray" v-bind:key="forecast.city">
          <td>{{forecast.city}}</td>
          <td v-show="time==='Current' || time==='LongTerm'">{{forecast.today}}</td>
          <td v-show="time==='Tomorrow' || time==='LongTerm'">{{forecast.tomorrow}}</td>
          <td v-show="time==='LongTerm'">{{forecast.day3}}</td>
          <td v-show="time==='LongTerm'">{{forecast.day4}}</td>
          <td v-show="time==='LongTerm'">{{forecast.day5}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      time: "Current",
      info: null,
      Oslo: null,
      Bergen: null,
      Stavanger: null,
      Trondheim: null,
      Haugesund: null,
      Drammen: null,
      Kristiansand: null,
      forecastArray: [],

      cityNames: [
        "Oslo",
        "Bergen",
        "Stavanger",
        "Trondheim",
        "Haugesund",
        "Drammen",
        "Kristiansand"
      ],
      position: [],
      map: null,
      tileLayer: null,
      layers: [
        {
          id: 0,
          name: "Cities",
          active: true,
          features: [
            {
              id: 0,
              name: "Oslo",
              type: "marker",
              coords: [59.9139, 10.7522]
            },
            {
              id: 1,
              name: "Bergen",
              type: "marker",
              coords: [60.3913, 5.3221]
            },
            {
              id: 2,
              name: "Trondheim",
              type: "marker",
              coords: [63.4305, 10.3951]
            },
            {
              id: 3,
              name: "Stavanger",
              type: "marker",
              coords: [58.97, 5.7331]
            },
            {
              id: 4,
              name: "Kristiansand",
              type: "marker",
              coords: [58.1599, 8.0182]
            }
          ]
        }
      ]
    };
  },
  async created() {
    const axios = require("axios");
    //let forecastString = this.forecastString
    let i = 0;
    for (let city of this.cityNames) {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            ",NO&APPID=4c3e7f6505140a61cdeee7719f798c32"
        )
        .then(result => {
          this.info = result.data;
          let forecast = {
            city: city,
            today:
              "\nTemperature: " +
              (this.info.list[0].main.temp - 272.15).toFixed(1) +
              "°C" +
              " Weather: " +
              this.info.list[0].weather[0].description,
            tomorrow:
              "\nTemperature: " +
              (this.info.list[8].main.temp - 272.15).toFixed(1) +
              "°C" +
              " Weather: " +
              this.info.list[8].weather[0].description,
            day3:
              "Temperature: " +
              (this.info.list[16].main.temp - 272.15).toFixed(1) +
              "°C" +
              " Weather: " +
              this.info.list[16].weather[0].description,
            day4:
              "Temperature: " +
              (this.info.list[24].main.temp - 272.15).toFixed(1) +
              "°C" +
              " Weather: " +
              this.info.list[24].weather[0].description,
            day5:
              "\nTemperature: " +
              (this.info.list[32].main.temp - 272.15).toFixed(1) +
              "°C" +
              " Weather: " +
              this.info.list[32].weather[0].description
          };
          this[city] = forecast;
          this.forecastArray.push(forecast);
        })
        .catch(error => console.log(city + "\n " + error));
    }
    //this.forecastString = forecastString
  },
  mounted() {
    this.initMap();
    this.initLayers();
    this.layerChanged(true);
  },
  watch: {
    /*checked() {
      this.$emit("layerChanged", this.checked);
    }*/
    position() {
      this.map.flyTo(this.position);
    }
  },
  methods: {
    /*
    updatePosition(loc) {
      console.log("Emitting updatePosition");
      this.$emit("updatePosition", loc);
    },
    resetPosition() {
      console.log("Emitting resetPosition");
      this.$emit("resetPosition");
    },
    updateTime(time) {
      this.time = time;
      this.$emit("updateTime", time);
    }*/
    initMap() {
      const accessToken =
        "pk.eyJ1IjoidmF5cmEiLCJhIjoiY2p0cGhyb2UwMDJ2bzQ0bzc2bmUxYXgwYiJ9.bzvNNOssxSGv4BwarWO9Bw";
      this.map = L.map("mapid").setView([60.1, 9.58], 8);
      this.tileLayer = L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: accessToken
        }
      );
      this.tileLayer.addTo(this.map);
    },
    initLayers() {
      let this_ = this;
      const markerFeatures = this.layers[0].features.filter(
        feature => feature.type === "marker"
      );
      markerFeatures.forEach(feature => {
        feature.leafletObject = L.marker(feature.coords).bindPopup(
          feature.name
        );
      });
    },
    updatePosition(loc) {
      console.log("updatePosition event handled");
      this.position = loc;
    },
    resetPosition() {
      console.log("resetting position");
      this.position = loc;
      this.map.setView(loc, 5);
    },
    updateTime(time) {
      this.time = time;
    },
    layerChanged(active) {
      this.layers[0].features.forEach(feature => {
        if (active) {
          feature.leafletObject.addTo(this.map);
        }
      });
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.black {
  background-color: #343a40;
}

.bar {
  position: sticky;
  top: 0;
  z-index: 1;
}

.weatherData {
  color: whitesmoke;
}
</style>