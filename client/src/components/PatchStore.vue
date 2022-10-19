<template>
  <div>
    <br>
    <b-button v-b-modal.modal-updateStore v-if="token">Update Store</b-button>
    <b-modal id="modal-updateStore" hide-footer centered>
      <template #modal-title>
        You are updating {{store.name}}
      </template>
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Update Store">
            <p>Only add the information you want to be changed.</p>
            <div class="row">
              <div class="col-sm">
                <p>
                  Description:
                  <b-form-textarea id="textarea" v-model="storeDescription" placeholder="Enter description.." rows="6" max-rows="9"></b-form-textarea >
                </p>
                <p>
                  Opening hours:
                  <b-form-timepicker v-model=storeOpenTime placeholder="Opens" locale="en-UK"></b-form-timepicker>
                  <b-form-timepicker v-model=storeCloseTime placeholder="Closes" locale="en-UK"></b-form-timepicker>

                </p>
              </div>
              <div class="col-sm">
                <p>
                  Information:
                  <b-form-input id="inputForms" v-model="storePhoneNumber" placeholder="Phone number, only digits">
                  </b-form-input>
                  <b-form-input id="inputForms" v-model="storeEmail" placeholder="Email"></b-form-input>
                </p>
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
              <b-button variant="warning" centered @click="$bvModal.hide('modal-updateStore')">Close</b-button>
            </div>
          </b-tab>
          <b-tab title="Add Lesson">
            <div id="buttonDiv">
              <p>
                Enter the details of the lesson:
                <b-form-input id="inputForms" v-model="lessonName" placeholder="Name"></b-form-input>
                <b-form-input id="inputForms" v-model="lessonPrice" placeholder="Price(only numbers)"></b-form-input>
                <b-form-input id="inputForms" v-model="lessonInstructor" placeholder="Instructor">
                </b-form-input>
              </p>
              <b-button id="successButton" variant="success" centered @click=addLesson()>Add Lesson</b-button>
              <b-button variant="warning" centered @click="$bvModal.hide('modal-updateStore')">Close</b-button>
            </div>
          </b-tab>
          <b-tab title="Add Board">
            <div id="buttonDiv">
              <p>
                Enter the details of the surfboard:
                <b-form-input id="inputForms" v-model="boardVolume" placeholder="Volume(in L, only numbers)">
                </b-form-input>
                <b-form-input id="inputForms" v-model="boardPrice" placeholder="Price(only numbers)"></b-form-input>
                <b-form-input id="inputForms" v-model="boardSize" placeholder="Size(in ft, only numbers)">
                </b-form-input>
                <b-form-input id="inputForms" v-model="boardStyle" placeholder="Style"></b-form-input>
                Allowed styles: Shortboard, Longboard, Hybridboard, Funboard and Beginnerboard.
              </p>
              <b-button id="successButton" variant="success" centered @click=addBoard()>Add Board</b-button>
              <b-button variant="warning" centered @click="$bvModal.hide('modal-updateStore')">Close</b-button>
            </div>
          </b-tab>
          <b-tab title="Add Gear">
            <div id="buttonDiv">
              <p>
                Enter the details of the gear:
                <b-form-input id="inputForms" v-model="gearName" placeholder="Name"></b-form-input>
                <b-form-input id="inputForms" v-model="gearPrice" placeholder="Price(only numbers)"></b-form-input>
                <b-form-input id="inputForms" v-model="gearSize" placeholder="Size(only numbers)"></b-form-input>
                <b-form-input id="inputForms" v-model="gearGender" placeholder="Gender"></b-form-input>
                <!-- <b-form-input id="inputForms" v-model="gearDescription" placeholder="Description"></b-form-input> -->
              </p>
              <b-button id="successButton" variant="success" centered @click=addGear()>Add Gear</b-button>
              <b-button variant="warning" centered @click="$bvModal.hide('modal-updateStore')">Close</b-button>
            </div>
          </b-tab>
        </b-tabs>
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
      token: '',
      store: [{
        name: '',
        description: '',
        phoneNumber: '',
        openingHours: '',
        email: '',
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
      if (this.storeEmail) {
        this.storeUpdated.email = this.storeEmail
      }
      if (this.storePhoneNumber) {
        this.storeUpdated.phoneNumber = this.storePhoneNumber
      }
      if (this.storeOpenTime && this.storeCloseTime) {
        this.storeUpdated.openingHours = this.storeOpenTime + '-' + this.storeCloseTime
      }

      console.log(this.storeUpdated)
      Api.patch('/stores/' + this.$route.params.id, {
        description: this.storeUpdated.adress.description,
        email: this.storeUpdated.email,
        phoneNumber: this.storeUpdated.phoneNumber,
        openingHours: this.storeUpdated.openingHours,
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
    },
    addLesson() {
      Api.post('/stores/' + this.$route.params.id + '/surfLessons', {
        name: this.lessonName,
        price: this.lessonPrice,
        instructor: this.lessonInstructor
      })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          console.log('lesson added')
          this.reloadPage()
        })
    },
    addBoard() {
      Api.post('/stores/' + this.$route.params.id + '/surfBoards', {
        volume: this.boardVolume + ' L',
        price: this.boardPrice,
        size: this.boardSize + 'ft',
        style: this.boardStyle
      })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          console.log('lesson added')
          this.reloadPage()
        })
    },
    addGear() {
      Api.post('/stores/' + this.$route.params.id + '/surfGears', {
        name: this.gearName,
        price: this.gearPrice,
        size: this.gearSize,
        gender: this.gearGender
        // description: this.gearDescription
      })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          console.log('lesson added')
          this.reloadPage()
        })
    }
  },
  created() {
    this.token = localStorage.getItem('user')
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
