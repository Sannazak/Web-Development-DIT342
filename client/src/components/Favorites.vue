<template>
  <div>
    <banner />
    <div class="container">
      <br />
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/user">Settings <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Favorites">Favorites</a>
            </li>
            <li class="nav-item">
              <LogoutButton />
              <a class="nav-link" href="" @click="logout">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <br />

    <main role="main">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h3> {{ user.email.fullName }} Favorite Stores</h3>
            <br />
          </div>
          <div class="col-md-12">
            <b-row deck id="deck-cards">
              <b-col cols="12" md="6" lg="3" v-for="favoriteStores in this.favoriteStoreFilled"
                v-bind:key="favoriteStores._id">
                <b-card id="resultCards" tag="article">
                  <b-card-title>
                    <h2>{{ favoriteStores.name }}</h2>
                  </b-card-title>
                  <b-card-text>
                    {{ favoriteStores.adress.city }} <br />
                    {{ favoriteStores.adress.postalCode }} <br />
                    {{ favoriteStores.adress.country }}
                  </b-card-text>
                  <b-button variant="dark" v-on:click="OnClick(favoriteStores._id)">Visit Store
                  </b-button>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </div>
        <br />
        <div class="row">
        </div>
      </div>
      <div>
      </div>
    </main>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import { Api } from '@/Api'
import Banner from '@/components/Banner.vue'
// import LogoutButton from './LogoutButton'

export default {
  name: 'User',
  components: { Banner },
  data() {
    return {
      user: {
        fullName: '',
        email: '',
        id: '',
        skillLevel: [],
        boardPreference: '',
        clothingSize: '',
        height: '',
        weight: ''
      },
      favoriteStoreFilled: [{
        _id: '',
        name: '',
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
      }],
      favouriteStores: [{
        _id: '',
        name: '',
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

  methods: {
    getUserDetails() {
      // get token from localStorage
      this.token = localStorage.getItem('user')
      try {
        // decode token here and attach to the user object
        console.log('Reading the token')
        console.log(this.token)
        const decoded = VueJwtDecode.decode(this.token)
        console.log('So far working')
        console.log(decoded)
        this.user = decoded
        console.log(this.user)
        console.log(this.user.email.email)
        console.log(this.user.email._id)
        console.log('still working')
        // get favorite store from this specific user
        Api.get('/users/' + this.user.email._id + '/favouriteStores')
          .then(response => {
            console.log('Favorite working')
            this.favouriteStores = response.data
            console.log(this.favouriteStores)
            this.favouriteStores.forEach(this.getFavoriteStoresData)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error, 'error from decoding token')
      }
    },

    getFavoriteStoresData(index) {
      Api.get('/stores/' + index)
        .then((response) => {
          console.log(response.data)
          this.favoriteStoreFilled.push(response.data)
          console.log('favoriteStoreFilled')
          console.log(this.favoriteStoreFilled)
        })
        .catch((error) => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },

    logout() {
      console.log('Testing token')
      if (localStorage.getItem('user')) {
        localStorage.clear()
        this.$router.push('/')
      }
    },

    OnClick(id) {
      // change view to show one store
      console.log(id)
      window.location = 'StoreView/' + id
    }
  },

  created() {
    // this.token = localStorage.getItem('user')
    this.getUserDetails()
  }
}
</script>

<style scoped>
.colum {
  align-items: right;
}
</style>
