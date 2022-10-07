<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home </router-link>
      <router-link to="/searchResult">Search Result </router-link>
      <router-link to="/StoreView/632b67eb702d604ee0031663">Store View </router-link>
      <!-- <router-link v-if="authenticated" to="/Home" v-on:click.native="logout()" replace>Logout</router-link> -->
    </div>
    <!-- <router-view @authenticated="setAuthenticated"/> -->
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<!-- <script>

export default {
  data() {
    return {
      authenticated: false,
      userAccount: {
        userName: '',
        password: ''
      }
    }
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status
    },
    logout() {
      this.authenticated = false
    }
  }
}
</script> -->

<style>
#app {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
