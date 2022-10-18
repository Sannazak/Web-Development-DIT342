<template>
  <div>
    <banner />
    <AddStoreModal />
    <b-container>
      <h5>Show all stores or select a specific city</h5>
      <b-form-select
        v-model="selected"
        @change="onSelectedCity(selected)"
        :options="options">
      </b-form-select>
      <div class="mt-3">
      </div>
      <br/>
      <b-row deck>
        <b-col
          cols="12"
          md="6"
          lg="3"
          v-for="stores in store"
          v-bind:key="stores._id"
        >
          <b-card id="resultCards" tag="article">
            <b-card-title>
              <h2>{{ stores.name }}</h2>
            </b-card-title>
            <b-card-text>
              {{ stores.phoneNumber}} <br />
              {{ stores.email}} <br />
              {{ stores.adress.city }} <br />
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
import AddStoreModal from '../components/AddStoreModal.vue'

export default {
  name: 'searchResult',
  components: { Banner, AddStoreModal },
  mounted() {
    this.getAllStores()
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Show all stores' },
        {
          label: 'Select a city',
          options: [
            { value: 'Brantevik', text: 'Brantevik' },
            { value: 'Göteborg', text: 'Göteborg' },
            { value: 'Halmstad', text: 'Halmstad' },
            { value: 'Mölle', text: 'Mölle' },
            { value: 'Varberg', text: 'Varberg' }
          ]
        }
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
          this.store = response.data
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

#resultCards {
  background-color: #054e47af;
  color: white;
  text-align: center;
  margin-bottom: 25px;
}
h5 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.mt-3 {
  margin-bottom: 20px;
}

</style>
