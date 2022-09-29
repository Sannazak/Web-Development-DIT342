<template>
  <div>
    <banner/>
    <FormSelect/>
    <store-item/>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import StoreItem from '../components/StoreItem.vue'
import FormSelect from '../components/FormSelect.vue'

export default {
  name: 'searchResult',
  components: { Banner, StoreItem, FormSelect },
  data() {
    return {
      stores: [{
      }]
    }
  }
}
</script>

<style>
</style>
