<template>
  <div>
    <br>
      <b-button id="loginButton" v-b-modal.modal-logIn v-if="!token">Log In</b-button>
      <b-modal id="modal-logIn" hide-footer centered>
        <template #modal-title id="modal-title-text" class="w-100">
          Sign In
        </template>
    <div>
      <h6>Welcome to surf.rental</h6>
      <div class="row">
        <div class="col-sm">
          <b-form @submit="onSubmit" class="add-form">
            <div class="form-group">
              <b-form-input id="inputForms" v-model="email" type="email" placeholder="Email address" required></b-form-input>
            </div>
            <div class="form-group">
              <b-form-input id="inputForms" v-model="password" type="password" placeholder="Password" required></b-form-input>
            </div>
            <input id="successButton" variant="success" centered type="submit" value="Sign in" class="btn-btn-block" />
            <div>
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

export default {
  name: 'LoginPopUp',
  data() {
    return {
      message: '',
      token: ''
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      Api.post('/users/loginhashed', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log('working')
          const token = response.data.token
          this.message = response.data.message
          console.log(token)
          localStorage.setItem('user', token)
          this.$router.push('/User')
        })
        .catch((error) => {
          this.message = 'Login Failed. Please try again'
          console.log(error)
          console.log(error.response)
        })
        .finally(() => {})
    }
  },

  created() {
    this.token = localStorage.getItem('user')
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

  #loginButton {
    margin-left: 9px;
  }

  h6 {
    color: blue;
  }
  </style>
