<template>
  <div>
    <banner />
    <b-container>
      <b-form-select
        v-model="selected"
        @change="onSelectedCity(selected)"
        :options="options"
      ></b-form-select>
      <div class="mt-3">
        Stores close to: <strong>{{ selected }}</strong>
      </div>
      <b-row deck id="deck-cards">
        <b-col cols="12" md="6" lg="3" v-for="stores in store" v-bind:key="stores._id">
          <b-card id="resultCards" tag="article"  >
            <b-card-title>
              <h2>{{ stores.name }}</h2>
            </b-card-title>
            <b-card-text>
              {{ stores._id }}
              {{stores.phoneNumber}}
              {{stores.openingHours}}
              {{stores.adress.city}}
            </b-card-text>
            <b-button variant="dark" v-on:click="OnClick(stores._id)">
              Visit Store
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import { Api } from '@/Api'

export default {
  name: 'searchResult',
  components: { Banner },
  mounted() {
    console.log('page is loaded')
    this.getAllStores()
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select a city' },
        { value: 'Brantevik', text: 'Brantevik' },
        { value: 'Göteborg', text: 'Göteborg' },
        { value: 'Halmstad', text: 'Halmstad' },
        { value: 'Mölle', text: 'Mölle' },
        { value: 'Varberg', text: 'Varberg' }
      ],
      text: '',
      store: [
        {
          _id: '',
          description: '',
          phoneNumber: '',
          openingHours: '',
          email: '',
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
    getAllStores() {
      Api.get('/stores/')
        .then((response) => {
          console.log(response.data)
          this.store = response.data
          console.log('api saved')
          console.log(this.store)
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          // always executes
        })
    },
    onSelectedCity(selected) {
      if (selected === null) {
        this.getAllStores()
      } else {
        this.getFilteredStores(selected)
      }
    },
    OnClick(id) {
      // change view to show one store
      console.log(id)
      window.location = 'StoreView/' + id
    },
    getFilteredStores(selected) {
      Api.get('/stores/?adress.city=' + selected)
        .then((response) => {
          this.store = response.data
          console.log(selected)
          console.log(this.store)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
/* .container-big {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 25px;
} */

.deck-cards {
  align-items: center;
  background-color: #054e47af;
  color: white;
  text-align: center;
  width: 250px;
  margin-bottom: 25px;
}

#resultCards {
  background-color: #054e47af;
  color: white;
  text-align: center;
  margin-bottom: 25px;
}
</style>
