<template>
  <div>
    <banner />
    <div class="container-big">
    <FormSelect />
    <!-- <storeItem v-bind:store="store"/>   v-on:get-store="getStore" -->
    <b-card-group deck id="deck-cards">
      <div v-for="stores in this.store" v-bind:key="stores.name">
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
            {{ stores.name }} <br />
            {{ stores._id }} <br />
            {{ stores.adress.country }}
          </b-card-text>

          <b-button variant="primary" v-on:click="OnClick(stores._id)"
            >Visit Store</b-button
          >
        </b-card>
      </div>
    </b-card-group>
  </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
// import StoreItem from '@/components/StoreItem.vue'
import FormSelect from '@/components/FormSelect.vue'
import { Api } from '@/Api'

export default {
  name: 'searchResult',
  components: { Banner, FormSelect },
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
    OnClick(id) {
      // change to show one store
      console.log(id)
      window.location = 'StoreView/' + id
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
