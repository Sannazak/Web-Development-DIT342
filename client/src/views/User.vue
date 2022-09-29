<template>
    <div>
      <banner/>
        <h2>Text Input</h2>
        <input v-model="text"> {{ text }}
        <h2>Select</h2>
        <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
    </div>
</template>

<script>
import Banner from '../components/Banner.vue'
export default {
  components: { Banner },
  data() {
    return {
      text: 'Edit me',
      selected: 'A'
    }
  }
}
</script>
