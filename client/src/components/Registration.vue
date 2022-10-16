<template>
  <div>
    <b-button v-b-modal.modal-register v-if="!token">Register</b-button>
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
      Api.post('/users/signuphashed', {
        fullName: this.userFullName,
        email: this.userEmail,
        password: this.userPassword
      }).then(response => {
        Api.post('/users/loginhashed', {
          email: this.userEmail,
          password: this.userPassword
        }).then(response => {
          console.log('working')
          const token = response.data.token
          this.message = 'User created'
          console.log(token)
          localStorage.setItem('user', token)
          this.$router.push('/User')
        })
          .catch((error) => {
            this.message = 'Login Failed. Please try again'
            console.log(error)
            console.log(error.response)
          })
        // console.log('working')
        // console.log(response)
        // this.message = 'User Created'
        // this.$router.push('/')
      })
        .catch((error) => {
          this.message = 'Login Failed. Please try again'
          console.log(error)
          console.log(error.response)
        })
        .finally(() => {})

      // if (this.userPassword === this.userConfirmPassword && this.userPassword != null) {
      //   Api.post('/users', {
      //     fullName: this.userFullName,
      //     email: this.userEmail,
      //     password: this.userPassword
      //   }).then((res) => {
      //     console.log(res)
      //     this.message = 'User Created'
      //     this.$router.push('/User')
      //   })
      //     .catch((error) => {
      //       console.log('Login Failed. Please try again')
      //       this.message = 'User already created. Please try again'
      //       console.log(error)
      //     }).finally(() => {
      //     })
      // } else {
      //   this.message = 'Error: Make sure email is correct and passwords are matching while being at least 3 letters.'
      // }
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
</style>
