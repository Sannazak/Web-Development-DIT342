<template>
  <div>
    <banner />
    <div class="container">
      <b-navbar toggleable="lg" class="navbar navbar-expand-md navbar-light bg-light">
        <b-navbar-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/user">Settings <span class="sr-only">(current)</span></b-nav-item>
            <b-nav-item active href="#">Favorites</b-nav-item>
            <b-nav-item href="#" @click="logout">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-navbar-collapse>
      </b-navbar>
    </div>
    <br />
    <main role="main">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h3>{{ user.email.fullName }} Favorite Stores</h3>
            <br />
          </div>
          <div class="col-md-12">
            <b-row deck id="deck-cards">
              <div v-for="favoriteStore in this.favoriteStoreFilled" v-bind:key="favoriteStore.name">
                <b-card v-if="favoriteStore.phoneNumber != null" id="resultCards" tag="article">
                  <b-card-title>
                    <h2>{{ favoriteStore.name }}</h2>
                  </b-card-title>
                  <b-card-text>
                    {{ favoriteStore.adress.city }} <br />
                    {{ favoriteStore.adress.postalCode }} <br />
                    {{ favoriteStore.adress.country }}
                  </b-card-text>
                  <b-button variant="dark" v-on:click="OnClick(favoriteStore._id)">Visit Store
                  </b-button>
                </b-card>
              </div>
            </b-row>
          </div>
        </div>
        <br />
        <div class="row"></div>
      </div>
      <div></div>
    </main>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import { Api } from '@/Api'
import Banner from '@/components/Banner.vue'

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
      favoriteStoreFilled: [
        {
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
        }
      ],
      favouriteStores: [
        {
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
        }
      ]
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
          .then((response) => {
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
    this.getUserDetails()
  }
}
</script>

<style scoped>
.colum {
  align-items: right;
}

.deck-cards {
  background-color: #054e47af;
  color: white;
  text-align: center;
  width: 250px;
  margin-bottom: 25px;
}

#resultCards {
  margin-bottom: 25px;
  margin-right: 25px;
  width: 250px;
}

@media all and (max-width: 800px) {
  #resultCards {
    width: 210px;
  }
}
</style>
