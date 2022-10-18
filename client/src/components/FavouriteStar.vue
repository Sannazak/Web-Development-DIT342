<template>
    <b-icon v-if="!this.store.storeMarked" icon="star" aria-hidden="true" font-scale="1.5" @click="addToFavorites()"></b-icon>
    <b-icon v-else icon="star-fill" aria-hidden="true" font-scale="1.5"></b-icon>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'FavouriteStar',
  data() {
    return {
      token: '',
      user: {
        id: '',
        userFavoriteStores: []
      },
      store: [{
        name: '',
        description: '',
        phoneNumber: '',
        openingHours: '',
        storeMarked: false,
        email: '',
        adress: {
          country: '',
          street: '',
          streetNr: '',
          postalCode: '',
          city: ''
        },
        surfBoards: [],
        surfLessons: [],
        surfGears: []
      }]
    }
  },
  mounted() {
    console.log('Page is loaded')
    console.log('Is page marked?')
    console.log(this.store.storeMarked)
    this.getUser()
    this.getSpot()
  },
  methods: {
    getUser() {
      this.token = localStorage.getItem('user')
      try {
        // decode token to retrive user id
        console.log('Reading the token')
        const decoded = VueJwtDecode.decode(this.token)
        this.user = decoded
        this.user.id = this.user.email._id
        console.log(this.user.email._id)
        console.log('still working')
      } catch (error) {
        console.log(error, 'error from decoding token')
      }
    },
    getSpot() {
      // Api.get('/stores/632b6798702d604ee003165b')
      Api.get('/stores/' + this.$route.params.id)
        .then(response => {
          this.store = response.data
          this.store.storeMarked = response.data.markedFavorite
          console.log('store api saved')
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },
    addToFavorites() {
      // Patch the store id as favorite to the user
      Api.patch('/users/' + this.user.id, {
        $push: { favouriteStores: this.$route.params.id }
      }).then(response => {
        console.log('patched to user')
      }).catch((error) => {
        this.message = 'Login Failed. Please try again'
        console.log(error)
        console.log(error.response)
      })
      // Path the store as been marked favorite
      this.storeMarked = true
      Api.patch('stores/' + this.$route.params.id, {
        markedFavorite: this.store.storeMarked
      }).then(response => {
        console.log('Store patched')
        console.log(this.store.storeMarked)
      }).catch((error) => {
        this.message = 'Error to patch'
        console.log(error)
      })
    }
  }
}
</script>
