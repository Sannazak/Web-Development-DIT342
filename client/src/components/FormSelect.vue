<template>
    <div>
      <b-form-select v-model="selectedCity" :options="options"></b-form-select>
      <div class="mt-3">Stores close to: <strong>{{ selectedCity }}</strong></div>
      <div v-for="store in stores" v-bind:key="store._id">
        <p>{{store}}</p>
      </div>
    </div>
</template>

<script>
// import { Api } from '@/Api'

export default {
  data() {
    return {
      selectedCity: null,
      options: [
        { value: null, text: 'Please select a city' },
        { value: 'Brantevik', text: 'Brantevik' },
        { value: 'Göteborg', text: 'Göteborg' },
        { value: 'Halmstad', text: 'Halmstad' },
        { value: 'Mölle', text: 'Mölle' },
        { value: 'Varberg', text: 'Varberg' },
        { value: { C: '3PO' }, text: 'This is an option with object value' }
      ],
      store: [{
        name: '',
        adress: {
          country: '',
          street: '',
          streetNr: '',
          postalCode: '',
          city: ''
        }
      }]
    }
  }
  /*   mounted() {
    console.log('Page is loaded')
    this.getStoresByCity()
  }, */
/*  methods: {
    getStoresByCity() {
      Api.get('/stores/')
      if (this.selectedCity === store.adress.city){
        .then(response => {
          this.store = response.data.store
      })}
        .catch(error => {
          this.store = error
        })
    }
  } */
}
</script>
