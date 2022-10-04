<template>
    <div>
        <br>
        <b-button v-b-modal.modal-1>Update store</b-button>
        <b-modal id="modal-1" hide-footer centered>
            <template #modal-title>
                You are updating {{store.name}}
            </template>
            <div class="row">
                <div class="col-sm">
                    <p>
                        Description:
                        <b-form-input id="inputFormTall" v-model="storeDescription"></b-form-input>
                    </p>
                </div>
                <div class="col-sm">
                    <p> Adress:
                        <b-form-input id="inputForms" v-model="storeStreet" placeholder="Street"></b-form-input>
                        <b-form-input id="inputForms" v-model="storeStreetNr" placeholder="Street Nr"></b-form-input>
                        <b-form-input id="inputForms" v-model="storePostalCode" placeholder="Postal Code">
                        </b-form-input>
                        <b-form-input id="inputForms" v-model="storeCity" placeholder="City"></b-form-input>
                        <b-form-input id="inputForms" v-model="storeCountry" placeholder="Country"></b-form-input>
                    </p>
                </div>
            </div>
            <div id="buttonDiv">
                <b-button id="successButton" variant="success" centered @click=patchStore()>Update Store</b-button>
                <b-button variant="warning" centered  @click="$bvModal.hide('modal-1')">Close</b-button>
            </div>
        </b-modal>
        <b-modal id="modal-2" hide-footer centered>
            <template #modal-title>
                Updated
            </template>
            <div>
                <p>
                    The store has been updated.
                </p>
                <b-button id="successButton" variant="success" centered @click="$bvModal.hide('modal-2')">OK</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'StorePatcher',
  data() {
    return {
      store: [{
        name: '',
        description: '',
        adress: {
          country: '',
          street: '',
          streetNr: '',
          postalCode: '',
          city: ''
        },
        surfBoards: [],
        surfLessons: [],
        surfGears: []
      }],
      storeUpdated: [{
        name: '',
        description: '',
        adress: {
          country: '',
          street: '',
          streetNr: '',
          postalCode: '',
          city: ''
        },
        surfBoards: [],
        surfLessons: [],
        surfGears: []
      }]
    }
  },
  mounted() {
    console.log('patcher loaded')
    this.getStore()
  },
  methods: {
    getStore() {
      Api.get('/stores/' + this.$route.params.id)
        .then(response => {
          this.store = response.data
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },
    patchStore() {
      console.log('patching store..')
      this.storeUpdated = this.store
      if (this.storeStreet) {
        this.storeUpdated.adress.street = this.storeStreet
      }
      if (this.storeStreetNr) {
        this.storeUpdated.adress.streetNr = this.storeStreetNr
      }
      if (this.storePostalCode) {
        this.storeUpdated.adress.postalCode = this.storePostalCode
      }
      if (this.storeCity) {
        this.storeUpdated.adress.city = this.storeCity
      }
      if (this.storeCountry) {
        this.storeUpdated.adress.country = this.storeCountry
      }
      if (this.storeDescription) {
        this.storeUpdated.adress.description = this.storeDescription
      }
      console.log(this.storeUpdated)
      Api.patch('/stores/' + this.$route.params.id, {
        description: this.storeUpdated.adress.description,
        adress: {
          country: this.storeUpdated.adress.country,
          street: this.storeUpdated.adress.street,
          streetNr: this.storeUpdated.adress.streetNr,
          postalCode: this.storeUpdated.adress.postalCode,
          city: this.storeUpdated.adress.city
        }
      })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          console.log('store updated')
          this.reloadPage()
        })
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
#inputForms {
    margin-top: 5px;
    padding-top: 5px;
}

#inputFormTall {
    height: 210px;
    margin-top: 5px;
    padding-top: 5px;
}

#successButton {
    margin-right: 5px;
}

#buttonDiv {
    align-content: center;
}
</style>
