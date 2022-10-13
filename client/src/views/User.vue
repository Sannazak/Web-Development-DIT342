<template>
    <div>
      <banner/>
      <div class="container">
      <br>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
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
            <a class="nav-link" href="/Favorites">Favorites</a>
          </li>
          <li class="nav-item">
            <LogoutButton/>
            <a class="nav-link" href="" @click="logout">Log Out</a>
          </li>
        </ul>
        </div>
      </nav>
      </div>
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
        <h3>Hello {{ fullName }}</h3>
        <br/>
        <p>Welcome to Surf Rentals.</p>
        <p>Complete your user profile to get a better experience on our website</p>
      </div>
      <div class="col-md-4">
        <b-icon icon="person-fill" font-scale="7.5"></b-icon>
      </div>
    </div>
    <br/>
    <div class="row">
    </div>
  </div>
  <div>
    <div class="container">
      <div class="row">
      <div class="col-md-2">
        <br/>
        <p>
          Main Settings
        </p>
      </div>
      <div class="col-md-6">
        <div class="col-xs-2">
          <p>Email</p>
          <b-form-input id="inputForms" type="email" v-model="email"></b-form-input>
          <b-form-input id="inputForms" v-model="fullName" placeholder="Full Name"></b-form-input>
          <b-form-input id="inputForms" v-model="skillLevel" placeholder="Skill Level"></b-form-input>
          <b-form-input id="inputForms" v-model="boardPreference" placeholder="Board Preference"></b-form-input>
          <b-form-input id="inputForms" v-model="clothingSize" placeholder="Clothing Size"></b-form-input>
          <b-form-input id="inputForms" v-model="height" placeholder="Height"></b-form-input>
          <b-form-input id="inputForms" v-model="weight" placeholder="Weight"></b-form-input>
          <br/>
          <b-button id="successButton" variant="success" centered @click=updateUserInfo()>Update</b-button>
          <p>
            {{ message }}
          </p>
      </div>
      </div>
    </div>
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
import VueJwtDecode from 'vue-jwt-decode'
import { Api } from '@/Api'
import Banner from '@/components/Banner.vue'
// import LogoutButton from './LogoutButton'

export default {
  name: 'User',
  components: { Banner },
  data() {
    return {
      text: 'Edit me',
      selected: 'A',
      email: '',
      fullName: '',
      token: '',
      message: '',
      user: {
        fullName: '',
        email: '',
        id: '',
        skillLevel: '',
        boardPreference: '',
        clothingSize: '',
        height: '',
        weight: ''
      }
    }
  },

  methods: {
    getUserDetails() {
      // get token from localStorage
      this.token = localStorage.getItem('user')
      try {
        // decode token here and attach to the user object
        console.log('Reading the token')
        console.log(this.token)
        const decoded = VueJwtDecode.decode(this.token)
        console.log('So far working')
        console.log(decoded)
        this.user = decoded
        console.log(this.user)
        console.log(this.user.email.email)
        console.log(this.user.email._id)
        console.log('still working')
        // get the user information by using the id
        Api.get('/users/' + this.user.email._id)
          .then(response => {
            this.email = response.data.email
            this.fullName = response.data.fullName
            console.log('Not sure')
            console.log(this.email)
            console.log(this.fullName)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error, 'error from decoding token')
      }
    },

    logout() {
      console.log('Testing token')
      if (localStorage.getItem('user')) {
        localStorage.clear()
        this.$router.push('/')
      }
    },

    updateUserInfo() {
      Api.put('/users/' + this.user.email._id, {
        email: this.email,
        fullName: this.fullName,
        skillLevel: this.skillLevel,
        boardPreference: this.boardPreference,
        clothingSize: this.clothSize,
        userHeight: this.height,
        userWeight: this.weight
      }).then(response => {
        console.log('patched to user')
        console.log(this.user)
      }).catch((error) => {
        this.message = 'Login Failed. Please try again'
        console.log(error)
        console.log(error.response)
      })
    }
  },
  created() {
    // this.token = localStorage.getItem('user')
    this.getUserDetails()
  }
}
</script>

<style scoped>
  .colum {
    align-items: right;
  }
</style>
