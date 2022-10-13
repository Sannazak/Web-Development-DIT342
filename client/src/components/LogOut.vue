<template>
    <b-dropdown-item href="/" @click="logout">Log out</b-dropdown-item>
</template>

<script>

export default {
  name: 'LogOut',
  data() {
    return {
      toking: ''
    }
  },

  methods: {
    logout() {
      console.log('Testing token')
      if (localStorage.getItem('user')) {
        localStorage.clear()
        this.$router.push('/')
      }
    }
  },

  created() {
    this.token = localStorage.getItem('user')
  }
}

</script>
