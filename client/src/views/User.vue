<template>
  <div>
    <banner />
    <div class="container">
      <b-navbar toggleable="lg" class="navbar navbar-expand-md navbar-light bg-light">
        <b-navbar-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item active href="#">Settings <span class="sr-only">(current)</span></b-nav-item>
            <b-nav-item href="/Favorites">Favorites</b-nav-item>
            <b-nav-item href="#" @click="logout">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-navbar-collapse>
      </b-navbar>
      </div>
      <br/>
<main role="main">
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h3>Hello {{ fullName }}</h3>
        <br/>
        <p class="paragraph-size">Welcome to Surf Rentals.</p>
        <p class="paragraph-size">Complete your user profile to get a better experience on our website</p>
      </div>
      <div class="col-md-4">
        <b-icon icon="person-fill" font-scale="7.5"></b-icon>
      </div>
    </div>
    <br/>
  </div>
  <div>
    <div class="container">
      <div class="row">
      <div class="col-md-6">
        <div class="col-xs-2">
          <label class="paragraph-size" for="inputEmail"><strong>Email</strong></label>
          <b-form-input id="inputEmail" label="Email" type="email" v-model="email"></b-form-input>
          <br/>
          <lable class="paragraph-size" for="inputFullName"><strong>Full Name</strong></lable>
          <b-form-input id="inputFullName" v-model="fullName"></b-form-input>
          <br/>
          <label class="paragraph-size" for="inputClothsSize"><strong>Choths Size</strong></label>
          <b-form-select v-model="clothingSize">
            <option disabled value="">Please select one</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </b-form-select>
          <br/>
          <br/>
          <label class="paragraph-size" for="inputHeigh"><strong>Height in cm</strong></label>
          <b-form-input id="inputHeigh" v-model="height"></b-form-input>
          <br/>
          <label class="paragraph-size" for="inputWeight"><strong>Weight in Kg</strong></label>
          <b-form-input id="inputWeight" v-model="weight"></b-form-input>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-5">
        <div class="col-xs-2">
          <br/>
          <label class="paragraph-size" for="checkbox-group-1"><strong>Select Board Preferences</strong></label>
          <b-form-group class="paragraph-size" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group id="checkbox-group-1" v-model="boardPreference" :options="options" :aria-describedby="ariaDescribedby" name="boardPreferences">
              <b-form-checkbox value="Longboard">Longboard</b-form-checkbox>
              <b-form-checkbox value="Shortboard">Shortboard</b-form-checkbox>
              <b-form-checkbox value="Hybrid">Hybrid</b-form-checkbox>
              <b-form-checkbox value="Mini Mal">Mini Mal</b-form-checkbox>
              <b-form-checkbox value="Beginner Board">Beginner Soft Board</b-form-checkbox>
            </b-form-checkbox-group>
              Board preferences:
            <div v-for="board in boardPreference" v-bind:key="board"> <strong>{{ board }}</strong></div>
          </b-form-group>
          <br/>
          <br/>
        <p class="paragraph-size"><strong>Skill Level:</strong></p>
        <b-form-select v-model="skillLevel">
            <option disabled value="">Please select one</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Pro</option>
        </b-form-select>
       </div>
      </div>
      <div class="col-md-12">
        <br/>
        <br/>
        <b-button id="successButton" variant="success" centered @click=updateUserInfo()>Update User Detais</b-button>
      </div>
    </div>
  </div>
  </div>
</main>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import { Api } from '@/Api'
import Banner from '@/components/Banner.vue'

export default {
  name: 'User',
  components: { Banner },
  data() {
    return {
      skillLevel: '',
      boardPreference: [],
      board: '',
      email: '',
      fullName: '',
      token: '',
      message: '',
      user: {
        fullName: '',
        email: '',
        id: '',
        skillLevel: '',
        boardPreference: [],
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
        localStorage.setItem('userId', this.user.email._id)// new line
        console.log('still working')
        // get the user information by using the id
        Api.get('/users/' + this.user.email._id)
          .then((response) => {
            this.email = response.data.email
            this.fullName = response.data.fullName
            this.skillLevel = response.data.skillLevel
            this.height = response.data.userHeight
            this.weight = response.data.userWeight
            this.boardPreference = response.data.boardPreference
            this.clothingSize = response.data.clothingSize
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
        clothingSize: this.clothingSize,
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
    this.getUserDetails()
  }
}
</script>

<style scoped>
.colum {
  align-items: right;
}

.col-xs-2 {
  text-align: left;
}
.details-right {
  margin-right: -20px
}

.paragraph-size {
  font-size: 19px;
}

.lable {
  padding-bottom: 2em;
  margin: auto;
}
</style>
