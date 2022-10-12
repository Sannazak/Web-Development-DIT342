<template>
    <div class="container">
      <Banner/>
      <br/>
      <nav class="navbar navbar-expand-md navbar-light  bg-light">
      <a class="navbar-brand" href="/">Home</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/user">Settings <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Favorites</a>
        </li>
        <li class="nav-item">
          <!-- <LogoutButton/> -->
          <a class="nav-link" href="/" tabindex="-1" aria-disabled="true" @click="logout">Log Out</a>
        </li>
        </ul>
       </div>
      </nav>
      <br/>
      <br/>
      <br/>
    </div>
</template>

<script>
// import { LogoutButton } from './LogoutButton.vue'
import Banner from '@/components/Banner.vue'

export default {
  name: 'Favorites',
  components: { Banner },
  // components: { LogoutButton }
  methods: {
    logout() {
      this.token = ''
      localStorage.setItem('user', this.token)
      console.log(this.token)
    }
  }
}
</script>

<style scoped>
  .colum {
    align-items: right;
  }
</style>
