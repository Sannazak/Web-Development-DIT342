<template>
    <div>
        <b-button id="button" v-b-modal.modal-addStore v-if="token">Add Store</b-button>
        <b-modal id="modal-addStore" hide-footer centered>
            <template #modal-title>
                Add Store
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
                <p>
                  {{this.warningMessage}}
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
                  <b-form-input id="inputForms" v-model="storeAddStreetNr" type="number" placeholder="Street Nr"></b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddPostalCode" type="number" placeholder="Postal Code">
                  </b-form-input>
                  <b-form-input id="inputForms" v-model="storeAddCity" placeholder="City(required)"></b-form-input>
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

export default {
  name: 'AddStoreModal',
  data() {
    return {
      token: '',
      openingHoursTotal: '',
      newId: '',
      newStoreAdress: {
        country: '',
        street: '',
        streetNr: '',
        postalCode: '',
        city: ''
      },
      warningMessage: ''
    }
  },
  methods: {
    addStore() {
      console.log('Adding store...')
      if (!this.storeAddCity) {
        this.warningMessage = 'City is required'
        console.log('city required')
      } else {
        this.openingHoursTotal = this.storeAddOpenTime + '-' + this.storeAddCloseTime
        if (this.openingHoursTotal === 'undefined-undefined') {
          this.openingHoursTotal = 'hours not set'
        }
        Api.post('/stores', {
          name: this.storeAddName,
          adress: {
            country: this.storeAddCountry,
            street: this.storeAddStreet,
            streetNr: this.storeAddStreetNr,
            postalCode: this.storeAddPostalCode,
            city: this.storeAddCity
          },
          description: this.storeAddDescription,
          email: this.storeAddEmail,
          phoneNumber: this.storeAddPhoneNumber,
          openingHours: this.openingHoursTotal
        })
          .catch(error => {
            console.error(error)
          })
          .then(response => {
            this.newId = response.data._id
            console.log('store added')
            window.location = 'StoreView/' + this.newId
          })
      }
    }
  },
  created() {
    this.token = localStorage.getItem('user')
  }
}
</script>

<style scoped>
#button {
  margin-top: 20px;
}
</style>
