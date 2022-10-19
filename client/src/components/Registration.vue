<template>
  <div>
    <b-button id="button" v-b-modal.modal-register v-if="!token"
      >Register</b-button
    >
    <b-modal id="modal-register" centered hide-footer>
      <template #modal-title id="modal-title-text" class="w-100">
        Register new user
      </template>
      <p>
        <b-form-input
          id="inputForms"
          type="email"
          v-model="userEmail"
          placeholder="Email"
          required
        ></b-form-input>
        <b-form-input
          id="inputForms"
          v-model="userFullName"
          placeholder="Full Name"
          required
        ></b-form-input>

        <b-form-input
          id="inputForms"
          type="password"
          v-model="userPassword"
          placeholder="Password"
          required
        ></b-form-input>
        <b-form-input
          id="inputForms"
          type="password"
          v-model="userConfirmPassword"
          placeholder="Confirm Password"
          required
        ></b-form-input>
        {{ this.message }}
      </p>
      <b-button
        id="successButton"
        variant="success"
        centered
        @click="registerUser()"
        >Register</b-button
      >
      <b-button
        variant="warning"
        centered
        @click="$bvModal.hide('modal-register')"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  components: {},
  data() {
    return {
      message: '',
      token: ''
    }
  },
  methods: {
    registerUser() {
      if (
        this.userPassword === this.userConfirmPassword &&
        this.userPassword != null
      ) {
        Api.post('/users/signuphashed', {
          fullName: this.userFullName,
          email: this.userEmail,
          password: this.userPassword
        })
          .then((response) => {
            Api.post('/users/loginhashed', {
              email: this.userEmail,
              password: this.userPassword
            })
              .then((response) => {
                console.log('working')
                const token = response.data.token
                this.message = 'User created'
                console.log(token)
                localStorage.setItem('user', token)
                this.$router.push('/User')
              })
              .catch((error) => {
                this.message = 'Registration Failed. Please try again'
                console.log(error)
                console.log(error.response)
              })
          })
          .catch((error) => {
            this.message =
              'Registration Failed. Email already exists or password not correct'
            console.log(error)
            console.log(error.response)
          })
          .finally(() => {})
      } else {
        this.message = 'Error: Make sure email is correct and passwords are matching.'
      }
    }
  },
  created() {
    this.token = localStorage.getItem('user')
  }
}
</script>
<style scooped>
#inputForms {
  margin-top: 10px;
}

#successButton {
  margin-right: 5px;
}
#button {
  margin-left: 5px;
  margin-bottom: 0px;
  margin-top: 25px;
}
</style>
