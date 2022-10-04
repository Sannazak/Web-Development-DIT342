<template>
  <div>
    <banner />
    <div class="container-big">
      <b-form-select
        v-model="selected"
        @change="onSelectedCity(selected)"
        :options="options"
      ></b-form-select>
      <div class="mt-3">
        Stores close to: <strong>{{ selected }}</strong>
      </div>
      <b-card-group deck id="deck-cards">
        <div v-for="stores in store" v-bind:key="stores._id">
          <b-card id="resultCards" tag="article"  >
            <b-card-title>
              <h2>{{ stores.name }}</h2>
            </b-card-title>
            <b-card-text>
              {{ stores.adress.city }} <br />
              {{ stores.adress.postalCode }} <br />
              {{ stores.adress.country }}
            </b-card-text>
            <b-button variant="dark" v-on:click="OnClick(stores._id)">
              Visit Store
            </b-button>
          </b-card>
        </div>
      </b-card-group>
    </div>
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
    formatter(value) {
      return value.toUpperCase()
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

<style>
.container-big {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 25px;
}
.deck-cards {
  align-items: center;
}
#resultCards {
  background-color: #054e47af;
  color: white;
  text-align: center;
  width: 250px;
  margin-bottom: 25px;
}
</style>
