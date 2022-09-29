<template>
    <div>
      <b-form-select v-model="selectedCity" :options="options"></b-form-select>
      <div class="mt-3">Stores close to: <strong>{{ selectedCity }}</strong></div>
      <div>{{store}}</div>
    </div>
</template>

<script>
import { Api } from '@/Api'

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
          city: ''
        }
      }]
    }
  },
  /*   mounted() {
    console.log('Page is loaded')
    this.getStoresByCity()
  }, */
  methods: {
    getStoresByCity() {
      Api.get('/stores/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>
