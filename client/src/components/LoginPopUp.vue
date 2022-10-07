<template>
  <div>
    <br>
      <b-button v-b-modal.modal-logIn :hidden="logInSucessful">Log In</b-button>
      <b-modal id="modal-logIn" hide-footer centered>
        <template #modal-title>
          <h3>Sign In</h3>
        </template>
    <div>
      <h5>Welcome to surf.rental</h5>
      <div class="row">
        <div class="col-sm">
          <b-form @submit="onSubmit" class="add-form">
            <div class="form-group">
              <b-form-input id="inputForms" v-model="email" type="email" placeholder="Email address" required></b-form-input>
            </div>
            <div class="form-group">
              <b-form-input id="inputForms" v-model="password" type="password" placeholder="Password" required></b-form-input>
            </div>
            <input type="submit" value="Sign in" class="btn-btn-block" />
            <p class="forgot-password text-right mt-2 mb-4">
              <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            <div class="buttonDiv">
              {{ message }}
            </div>
          </b-form>
        </div>
      </div>
    </div>
      </b-modal>
    </div>
  </template>

<script>
import { Api } from '@/Api'
// import { EventBus } from './main.js'

export default {
  name: 'LoginPopUp',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      logInSucessful: false,
      user: [{
        email: '',
        password: '',
        id: ''
      }]
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      Api.get('/users?email=' + this.email)
        .then(response => {
          this.user.email = response.data[0].email
          this.user.password = response.data[0].password
          this.user.id = response.data[0]._id
          console.log(this.user.email)
          console.log(this.user.password)
          console.log(this.user.id)
          if (this.email === this.user.email && this.password === this.user.password) {
            console.log('success')
            this.message = 'Login correct'
            this.$router.push('/User')
            this.logInSucessful = true
            this.$emit('logedIn', this.logInSucessful)
          } else {
            this.message = 'Login Failed. User does not exist. Check email and password!'
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

  <style scoped>
  #inputForms {
    margin-top: 5px;
    padding-top: 5px;
  }

  #inputFormTall {
    height: 210px;
    margin-top: 5px;
    padding-top: 5px;
  }

  #successButton {
    margin-right: 5px;
  }

  .buttonDiv {
    align-content: center;
  }

  h5 {
    color: blue;
  }
  </style>
