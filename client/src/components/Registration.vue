<template>
    <div class="vue-tempalte">
        <banner/>
        <br>
        <form @submit="onSubmit" class="add-form">
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Full Name</label>
                <input v-model="fullName" class="form-control form-control-lg" required/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control form-control-lg" required/>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" required/>
            </div>
            <input type="submit" value="Submit" class="btn-btn-block"/>

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
      message: ''
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      Api.post('/users', {
        fullName: this.fullName,
        email: this.email,
        password: this.password
      }).then((res) => {
        console.log(res)
        this.message = 'User Created'
        console.log(event)
        this.$router.push('/User')
      })
        .catch((error) => {
          console.log('Login Failed. Please try again')
          this.message = 'User already created. Please try again'
          console.log(error)
        }).finally(() => {
        })
    }
  }
}
</script>
