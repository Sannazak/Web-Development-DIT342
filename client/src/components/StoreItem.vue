<template>
  <div>
    <b-card
      title="Store"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary" v-on:click="getSingleStore()">Visit Store</b-button>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'storeItem',
  props: ['store'],
  methods: {
    getSingleStore() {
      this.$emit('get-store', this.store._id)
      console.log('get-store with this id' + this.store._id) // add connection to storeview
    }
  }
}
</script>

<style></style>
