<template>
  <div>
    <banner/>
    <FormSelect/>
    <storeItem v-bind:store="store" v-on:get-store="getStore"/>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import StoreItem from '../components/StoreItem.vue'
import FormSelect from '../components/FormSelect.vue'
import { Api } from '@/Api'

export default {
  name: 'searchResult',
  components: { Banner, StoreItem, FormSelect },
  mounted() {
    console.log('page is loaded')
    Api.get('/stores')
      .then(response => {
        this.store = response.data // console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      stores: [{
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
  },
  methods: {
    getStore(id) { // change to show one store
      console.log(id)
    }
  }
}
</script>

<style>
</style>
