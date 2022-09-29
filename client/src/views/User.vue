<template>
    <div>
      <banner/>
      <br>
        <h2>User Page</h2>
        <br>
        <input v-model="text">
        <h2>Skill Level</h2>
        <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Pro</option>
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
