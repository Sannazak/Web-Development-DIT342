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
      this.token = ''
      localStorage.setItem('user', this.token)
      console.log(this.token)
    }
  },

  created() {
    this.token = localStorage.getItem('user')
  }
}

</script>
