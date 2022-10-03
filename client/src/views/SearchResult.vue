<template>
  <div>
    <banner />
    <div class="container-big">
      <b-form-select v-model="selected" :options="options" ></b-form-select>
      <div class="mt-3">Stores close to: <strong>{{ selected }}</strong></div>
    <!-- <FormSelect @selectedCity="getStoreBySelectedCity"/> // get from formselect
    <h1>{{ selectedCity }}</h1> -->
    <!-- <storeItem v-bind:store="store"/>   v-on:get-store="getStore" -->
    <b-card-group deck id="deck-cards">
      <div v-for="stores in store" v-bind:key="stores._id">
        <div v-if="selected === stores.adress.city">
        <!-- <div class=”matchedStores” v-for="stores in matchedStores" v-bind:key="stores._id"> -->
        <b-card
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 16rem"
          class="mb-2"
        >
          <b-card-title
            ><h2>{{ stores.name }}</h2></b-card-title
          >

          <b-card-text>
            {{ stores.adress.city }} <br />
            {{ stores.adress.postalCode }} <br />
            {{ stores.adress.country }}
          </b-card-text>

          <b-button variant="primary" v-on:click="OnClick(stores._id)"
            >Visit Store</b-button
          >
        </b-card>
        </div>
      </div>
    </b-card-group>
  </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
// import StoreItem from '@/components/StoreItem.vue'
/* import FormSelect from '@/components/FormSelect.vue' */
import { Api } from '@/Api'

export default {
  name: 'searchResult',
  components: { Banner/* , FormSelect */ },
  mounted() {
    console.log('page is loaded')
    Api.get('/stores')
      .then((response) => {
        console.log(response.data)
        this.store = response.data
        console.log('api saved')
        console.log(this.store)
        console.log(this.store.name) // console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
        { value: 'Varberg', text: 'Varberg' },
        { value: { C: '3PO' }, text: 'This is an option with object value' }
      ],
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
      ],
      /* selectedCity: '', */
      /* computed: {
        matchedStores: function () {
          // eslint-disable-next-line no-undef
          return _.pickBy(this.stores, function (s) {
            if (s.city === this.selected.value) { return s.city }
          })
        }
      }, */
      methods: {
        OnClick(id) {
        // change view to show one store
          console.log(id)
          window.location = 'StoreView/' + id
        }/* ,
        getStoreBySelectedCity(value) {
          this.selectedCity = value
        } */
      }
    }
  }
}
</script>

<style>
  .container-big {
    max-width: 1150px;
margin: 0 auto;
  }
  .deck-cards {
    margin: 0 auto;
    align-content: center;
  }
</style>
