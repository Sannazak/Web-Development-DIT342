<template>
    <div>
        <banner/>
        <ShowStore/>
        <p>{{stores}}</p>
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import ShowStore from '../components/ShowStore.vue'

export default {
  name: 'searchResult',
  components: { Banner, ShowStore },
  data() {
    return {
      stores: []
    }
  }
}
</script>

<style>
</style>
