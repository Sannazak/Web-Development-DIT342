<template>
  <div class="vue-tempalte">
    <banner />
    <br />
    <form @submit="onSubmit" class="add-form">
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="email"
          class="form-control form-control-lg"
          type="email"
          placeholder="Your email"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          class="form-control form-control-lg"
          type="password"
          placeholder="Add a password"
        />
      </div>

      <input type="submit" value="Sign in" class="btn-btn-block" />
      <!--<b-button type="submit" class="btn btn-dark btn-lg btn-block" @click="Submit()">Sign In</b-button>
            <router-link to="/user" tag="button">Sign In</router-link>-->
      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
      <div>
        {{ message }}
      </div>
      <div class="social-icons">
        <ul>
          <li>
            <a href="#"><i class="fa fa-google"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-facebook"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-twitter"></i></a>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Banner from '../components/Banner.vue'

export default {
  components: { Banner },
  data() {
    return {
      email: '',
      password: '',
      message: '',
      user: [{
        email: '',
        fullName: '',
        password: '',
        skillLevel: [],
        boardPreference: [],
        clothingSize: '',
        userHeight: '',
        userWeight: '',
        favouriteStores: [{ }],
        favouriteSpots: [{ }]
      }]
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      Api.get('/users?email=' + this.email)
        .then(response => {
          console.log(response.data)
          console.log('sor far so good')
          this.user.email = response.data[0].email
          this.user.password = response.data[0].password
          console.log(this.user.email)
          console.log(this.user.password)
          console.log('so far so good again')
          if (this.email === this.user.email && this.password === this.user.password) {
            console.log('success')
            this.message = 'Login correct'
            this.$router.push('/User')
          } else {
            this.message = 'Login Failed. Please try again later'
          }
        })
        .catch((error) => {
          this.message = 'Login Failed. Please try again'
          console.log(error)
        })
        .finally(() => {})
    }
  }
}
</script>
