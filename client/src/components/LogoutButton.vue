<template>
    <a class="nav-link" href="" tabindex="-1" aria-disabled="true" @click="logout">Log Out</a>
</template>

<script>

export default {
  name: 'LogoutButton',
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
