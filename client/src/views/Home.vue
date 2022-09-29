<template>
  <div>
    <banner/>
    <p></p>
    <!-- <nav class="navbar">
      <div class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav>-->
    <b-nav class="container">
      <router-link class="btn btn-outline-primary" to="/login">Sign in</router-link>
      <router-link class="btn btn-outline-primary" to="/signup">Sign up</router-link>
      <router-link class="btn btn-outline-primary" to="/user">User</router-link>
       <!-- <router-link to="/">Home</router-link>
        <router-link to="/user">User</router-link>-->
    </b-nav>
    <!--<b-nav justified>
      <b-nav-item active>First</b-nav-item>
      <b-nav-item>Second</b-nav-item>
      <b-nav-item>Third</b-nav-item>
    </b-nav>-->
    <hr class="hr">
    <h2 class="text"> Top spots </h2>
    <p></p>
    <b-card class="top_items" title="Apelviken" :img-src="require('@/assets/apelviken.webp')" img-alt="Image" img-top
      tag="article">
      <b-card-text>Great place for beginners. Children and adults.</b-card-text>
      <b-button href="#" variant="primary">Visit</b-button>
    </b-card>
    <b-section id="home">
      <h1>Next page</h1>
      <p>Just another text</p>
    </b-section>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

import Banner from '@/components/Banner.vue'

export default {
  name: 'home',
  components: { Banner },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}

.top_items {
  max-width: 25rem;
}

hr {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 1px;
  background-color: black;
}

.text {
  position: relative;
  padding-left: 1px;
  padding-top: 1px;
  display: flex;
  align-items: left;
  justify-content: left;
  left: 170px;
}

.container {
  width: 100%;
  height: 100%,
}

section{
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
}

section h1{
  font-size: 4rem;
}

section p{
  font-size: 1.5rem;
}
</style>
