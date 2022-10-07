<template>
    <div>
      <!-- <banner/> -->
      <br>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Settings <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Favorites</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        </div>
      </nav>
      <br/>
      <br/>
      <br/>
<main role="main">
  <!-- <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">Hello user</h1>
      <p>Welcome to your profile page. Enjoy all the features from the website by setting up your style of surf and favorite things</p>
    </div>
  </div> -->
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h3>Hello (enter name of the user)</h3>
        <p>Complete your user profile to get a better experience on our website</p>
      </div>
      <div class="col-md-4">
        <b-icon icon="person-fill" font-scale="7.5"></b-icon>
      </div>
    </div>
    <div class="row">

    </div>
  </div>
</main>
        <!-- <h2>User Page</h2>
        <br>
        <input v-model="text">
        <h2>Skill Level</h2>
        <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Pro</option>
        </select>
        <span>Selected: {{ selected }}</span> -->
    </div>
</template>

<script>
// import PersonIcon from '../components/PersonIcon.vue'

export default {
  name: 'User',
  // components: { PersonIcon },
  data() {
    return {
      text: 'Edit me',
      selected: 'A'
    }
  }
}
</script>

<style scoped>
  .colum {
    align-items: right;
  }
</style>
