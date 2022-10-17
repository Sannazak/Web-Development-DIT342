<template>
    <div>
        <br>
        <b-button v-b-modal.modal-deleteStore v-if="token">Delete Store</b-button>
        <b-modal id="modal-deleteStore" hide-footer centered>
            <template #modal-title>
                Delete Store
            </template>
            <div>
                <p>Confirm deletion of store.</p>
                <b-button id="successButton" variant="danger" centered @click=deleteStore()>Delete Store</b-button>
                <b-button centered @click="$bvModal.hide('modal-deleteStore')">Close</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { Api } from '../Api'
import router from '../router'

export default {
  name: 'DeleteStoreModal',
  data() {
    return {
      token: ''
    }
  },
  methods: {
    deleteStore() {
      Api.delete('/stores/' + this.$route.params.id)
        .catch(error => {
          console.error(error)
        })
        .then(response => {
          console.log(response)
          router.push('/searchResult')
        })
    }
  },
  created() {
    this.token = localStorage.getItem('user')
  }
}
</script>

<style scoped>

</style>
