<template>
    <div>
        <banner/>
        <ShowStore/>
        <div v-for="store in stores" v-bind:key="store.name">
          <store-item v-bind:store="store"/>
        </div>
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import ShowStore from '../components/ShowStore.vue'
import StoreItem from '../components/StoreItem.vue'

export default {
  name: 'searchResult',
  components: { Banner, ShowStore, StoreItem },
  data() {
    return {
      stores: [{
        _id: '632b6596f4f37c039c741905',
        name: 'totally new surfstore where erik works',
        city: 'Åsa',
        __v: 0
      }]
    }
  }
}
</script>

<style>
</style>
