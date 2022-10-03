<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home </router-link>|
      <router-link to="SearchResult">Search Result </router-link>|
      <router-link to="StoreView/632b67eb702d604ee0031663">Store View </router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

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
