<template>
    <div>
      <b-form-select v-model="selected" :options="options" @select="$emit('selectedCity')"></b-form-select>
      <div class="mt-3">Stores close to: <strong>{{ selected }}</strong></div>
    </div>
</template>

<script>
// import { Api } from '@/Api'

export default {
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
      ]
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
