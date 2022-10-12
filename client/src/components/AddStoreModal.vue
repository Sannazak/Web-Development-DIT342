<template>
    <div>
        <br>
        <b-button v-b-modal.modal-addStore>Add store</b-button>
        <b-modal id="modal-addStore" hide-footer centered>
            <template #modal-title>
                Add store
            </template>
            <div>
                <p>Please fill out as much information as possible</p>
                <div class="row">
              <div class="col-sm">
                <p>
                <b-form-input id="inputForms" v-model="storeAddName" placeholder="Enter store name.."></b-form-input>
                  <b-form-textarea id="inputForms" v-model="storeAddDescription" placeholder="Enter description.." rows="3" max-rows="6"></b-form-textarea >
                </p>
                <p>
                  Opening hours:
                  <b-form-timepicker v-model=storeAddOpenTime placeholder="Opens" locale="en-UK"></b-form-timepicker><br>
                  <b-form-timepicker v-model=storeAddCloseTime placeholder="Closes" locale="en-UK"></b-form-timepicker>

                </p>
              </div>
              <div class="col-sm">
                <p>
                  <b-form-input id="inputForms" v-model="storeAddPhoneNumber" placeholder="Phone number, only digits">
                  </b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddEmail" placeholder="Email"></b-form-input>
                </p>
                <p> Adress:
                  <b-form-input id="inputForms" v-model="storeAddStreet" placeholder="Street"></b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddStreetNr" placeholder="Street Nr"></b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddPostalCode" placeholder="Postal Code">
                  </b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddCity" placeholder="City"></b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddCountry" placeholder="Country"></b-form-input>
                </p>
              </div>
            </div>
                <b-button id="successButton" variant="success" centered @click=addStore()>Add store</b-button>
                <b-button centered @click="$bvModal.hide('modal-addStore')">Close</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { Api } from '../Api'
import router from '../router'

export default {
  name: 'AddStoreModal',
  data() {
    return {
      openingHoursTotal: '',
      newId: ''
    }
  },
  methods: {
    addStore() {
      console.log('Adding store...')
      this.openingHoursTotal = this.storeAddOpenTime + '-' + this.storeAddCloseTime
      Api.post('/stores', {
        name: this.storeAddName,
        description: this.storeAddDescription,
        email: this.storeAddEmail,
        phoneNumber: this.storeAddPhoneNumber,
        openingHours: this.openingHoursTotal,
        adress: {
          country: this.storeAddCountry,
          street: this.storeAddCountry,
          streetNr: this.storeAddCountry,
          postalCode: this.storeAddCountry,
          city: this.storeAddCountry

        }
      })
        .catch(error => {
          console.error(error)
        })
        .then(response => {
          console.log('store added')
          console.log(response.data._id)
          if (response.data._id) {
            this.newId = response.data._id
            router.push('/StoreView/' + this.newId)
          } else {
            router.push('/searchResult')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
