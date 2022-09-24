<template>
    <div>
        <banner/>
        <ShowStore/>
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import ShowStore from '../components/ShowStore.vue'

export default {
  name: 'searchResult',
  components: { Banner, ShowStore }
}
</script>

<style>
</style>
