<template>
    <div class="vue-tempalte">
        <banner/>
        <form>
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input v-model="fullName" type="text" class="form-control form-control-lg" v-bind:key="fullName"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control form-control-lg" v-bind:key="email"/>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" v-bind:key="password"/>
            </div>

            <b-button type="submit" class="btn btn-dark btn-lg btn-block" @click="Submit()">Sign Up</b-button>
            <div>
              <p>{{ message }}</p>
            </div>
            <p class="forgot-password text-right">
                <router-link to="/login">Already registered?</router-link>
            </p>
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
      fullName: '',
      email: '',
      password: '',
      success: '',
      Verified: false,
      message: '',
      status: 201,
      user: {}
    }
  },
  methods: {
    Submit() {
      Api.post('/users', {
        fullName: this.fullName,
        email: this.email,
        password: this.password
      }).then((res) => {
        this.message = res.data.message
        /* if (res.data.status === 201) {
          this.Verified = true
          this.message = 'User created'
          // this.$router.push({ name: 'users', params: { _id: this.user._id } })
        } else {
          this.message = 'Login Failed.'
        } */
      })
        .catch((error) => {
          // this.message = 'Login Failed. Please try again'
          this.message = error
        }).finally(() => {
        })
    }
  }
}
</script>
