<template>
  <div class="hero">
    <div>
      <h1 class="display-3">Weather App</h1>
      <p class="lead">Weather report for a random selection of cities</p>
      <div id="mapid"></div>
    </div>
  </div>
</template>

<style>
.hero {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero .lead {
  font-weight: 200;
  font-size: 1.5rem;
}
</style>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js PWA",
      checked: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}

#mapid {
  height: 400px;
  z-index: 0;
}
</style>
