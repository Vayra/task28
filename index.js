<<<<<<< HEAD
var mymap = L.map("mapid").setView([51.505, -0.09], 13);

const access_token =
  "pk.eyJ1IjoidmF5cmEiLCJhIjoiY2p0cGhyb2UwMDJ2bzQ0bzc2bmUxYXgwYiJ9.bzvNNOssxSGv4BwarWO9Bw";

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
=======
const L = require('leaflet')
const axios = require('axios')
const expressVue = require('express-vue')
const app = express();
const port = 8080;

const expressVueMiddleware = expressVue.init();
app.use(expressVueMiddleware);

const oslo = [59.9139, 10.7522]
var mymap = L.map('mapid').setView([oslo[0], oslo[1]], 13);
const access_token = 'pk.eyJ1IjoidmF5cmEiLCJhIjoiY2p0cGhyb2UwMDJ2bzQ0bzc2bmUxYXgwYiJ9.bzvNNOssxSGv4BwarWO9Bw'



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
>>>>>>> 464b1834a7bd216ccc47d8eb76075732f56e0525
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: access_token
<<<<<<< HEAD
  }
).addTo(mymap);
=======
}).addTo(mymap);



app.listen(port, () => {
    console.log('Listening on port ' + port);
});
>>>>>>> 464b1834a7bd216ccc47d8eb76075732f56e0525
