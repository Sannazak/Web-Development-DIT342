<template>
  <div v-if="token">
  <b-icon
    v-if="!this.storeMarked "
    icon="star"
    aria-hidden="true"
    font-scale="1.5"
    @click="addToFavorites()"
  ></b-icon>
  <b-icon v-else icon="star-fill" aria-hidden="true" font-scale="1.5" @click="removeFavorites()"></b-icon>
</div>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'FavouriteStar',
  data() {
    return {
      token: '',
      storeMarked: false,
      user: {
        id: ''
      },
      userFavoriteStores: [],
      store: [
        {
          name: '',
          description: '',
          phoneNumber: '',
          openingHours: '',
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
        }
      ]
    }
  },
  mounted() {
    console.log('Page is loaded')
    console.log('Is page marked?')
    console.log(this.store.storeMarked)
    this.getUser()
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
        Api.get('/users/' + this.user.email._id)
          .then((response) => {
            this.userFavoriteStores = response.data.favouriteStores
            console.log('Not sure')
            console.log(this.userFavoriteStores)
          })
          .catch((error) => {
            console.log(error)
          })
          .then((response) => {
            this.checkStoreMarkedFavourite()
          })
      } catch (error) {
        console.log(error, 'error from decoding token')
      }
    },
    checkStoreMarkedFavourite() {
      console.log('Check for array')
      console.log(this.userFavoriteStores)
      for (let i = 0; i < this.userFavoriteStores.length; i++) {
        if (this.$route.params.id === this.userFavoriteStores[i]) {
          this.storeMarked = true
        }
      }
      console.log('Check if its marked')
      console.log(this.storeMarked)
    },
    addToFavorites() {
      // Patch the store id as favorite to the user
      Api.patch('/users/' + this.user.id, {
        $push: { favouriteStores: this.$route.params.id }
      })
        .then((response) => {
          console.log('patched to user')
        })
        .catch((error) => {
          this.message = 'Login Failed. Please try again'
          console.log(error)
          console.log(error.response)
        }).then(remove => {
          this.reloadPage()
        })
    },
    removeFavorites() {
      console.log('Removing favorite')
      console.log(this.userFavoriteStores)
      Api.delete('/users/' + this.user.id + '/favouriteStores/' + this.$route.params.id)
        .then(response => {
          console.log('Deleted from array')
        }).catch(error => {
          console.log(error)
        }).then(response => {
          this.reloadPage()
        })
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>
