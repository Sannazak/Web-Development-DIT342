<template>
    <div>
        <Banner/>
        <StoreViewer/>
    </div>
</template>

<script>
import { Api } from '@/Api'
import Banner from '../components/Banner.vue'
import StoreViewer from '../components/StoreViewer.vue'

export default {
  name: 'StoreView',
  components: {
    Banner,
    StoreViewer
  },
  mounted() {
    console.log('Page is loaded')
  },
  methods: {
    getSpot() {
      Api.get('/stores/632b6798702d604ee003165b')
        .then(response => {
          console.log(response.data)
          this.store = response.data
          console.log(this.store)
          console.log(this.store.name)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    }
  },
  data() {
    return {
      store: {}
    }
  }
}
</script>

  <style scoped>

</style>
