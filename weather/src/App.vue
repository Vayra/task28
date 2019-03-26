<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
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
            <b-nav-item  v-on:click='updateTime("Current")'>Current</b-nav-item>
            <b-nav-item  v-on:click='updateTime("Tomorrow")'>Tomorrow</b-nav-item>
            <b-nav-item  v-on:click='updateTime("LongTerm")'>Long term</b-nav-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- routes will be rendered here -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      time: 'Current'
    };
  },
  async created() {},
  watch: {
    // everytime a route is changed refresh the activeUser
  },
  methods: {
    updatePosition(loc) {
      console.log("Emitting updatePosition");
      this.$emit("updatePosition", loc);
    },
    resetPosition(){
      console.log("Emitting resetPosition");
      this.$emit("resetPosition");
    },
    updateTime(time){
      this.time = time;
      this.$$emit("updateTime", time)
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
  background-color:#343a40;
}


</style>