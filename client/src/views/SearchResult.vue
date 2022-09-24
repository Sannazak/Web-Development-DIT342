<template>
    <div>
        <banner />
    </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue'

export default {
  name: 'search-result',
  components: { Banner },
  data() {
    return {
      message: 'none'
    }
  }
} </script>
<style>

</style>
