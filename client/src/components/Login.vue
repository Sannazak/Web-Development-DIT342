<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" class="form-control form-control-lg" v-bind:key="email" type="email" placeholder="Your email"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="password" v-on:keyup.enter="Submit()" v-bing:key="password" type="password" class="form-control form-control-lg" placeholder="Add a password"/>
            </div>
            <b-button type="submit" class="btn btn-dark btn-lg btn-block" @click="Submit()">Sign In</b-button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>

        </form>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {

  data() {
    return {
      email: '',
      password: '',
      success: '',
      Verified: false,
      response: '',
      user: {}
    }
  },
  methods: {
    Submit() {
      Api.post('/users', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          this.Verified = true
          this.response = res.data
          this.user = res.data
          console.log(this.user)
          this.$router.push({ name: 'users', params: { _id: this.user._id } })
        } else {
          this.response = 'Login Failed. Please try again'
        }
      })
        .catch((error) => {
          this.response = 'Login Failed. Please try again'
          console.log(error)
        }).finally(() => {
        })
    }
  }
}
</script>
