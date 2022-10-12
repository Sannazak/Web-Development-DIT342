<template>
  <div class="container">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <div class="row">
      <div id="col_header" class="col-12">
        <h3>{{store.name}} in {{store.adress.city}} {{this.token}}</h3>
      </div>
      <div id="image-col" class="col-4">
        <img id ="store-image" src="../assets/stores/surfshop1.jpg" fluid class="rounded" alt="image of spot" width="350px"> <br><br><br><br>
      </div>
      <div id="col_right" class="col-4">
        <p><b>About {{store.name}}</b><br>
          {{store.description}}
        </p>
      </div>
      <div id="col-adress" class="col-4">
        <p id="adress_text"><b>How to get here:</b><br>
          {{store.adress.street}} {{store.adress.streetNr}}<br>
          {{store.adress.postalCode}} {{store.adress.city}}<br>
          {{store.adress.country}}
        </p>
        <p>
          <b>Details:</b><br>
          Phone: {{store.phoneNumber}}<br>
          Email: {{store.email}}<br>
          Open:
          {{store.openingHours}}
        </p>
      </div>
      <div class="col-12">
        <hr>
      </div>
      <div id="image-col" class="col-4">
        <img id="store-image" src="../assets/maps-google.jpg" fluid class="rounded" alt="image of spot" width="350px">
      <p><PatchStore/> <DeleteStoreModal/></p>
      </div>
      <div id="lower-col" class="col-8">
        <p>
          <b>Surflessons available:</b>
        <ul>
          <div id="offersListItem" v-for="lesson in this.surfLessonArrayFilled" v-bind:key="lesson.name">
            <li v-if ="lesson.name != null">
            {{lesson.name}} - Instructed by: {{lesson.instructor}} - {{lesson.price}}SEK
            </li>
          </div>
        </ul>
        </p>
        <hr>
        <p>
          <b>Surfboards available:</b>
        <ul>
          <div id="offersListItem" v-for="boards in this.surfBoardsArrayFilled" v-bind:key="boards._id">
            <li v-if ="boards.price != null">
            {{boards.style}} - {{boards.size}} - {{boards.volume}} - {{boards.price}}SEK
            </li>
          </div>
        </ul>
        </p>
        <hr>
        <p>
          <b>Surfgear available:</b>
        <ul>
          <div id="offersListItem" v-for="gears in this.surfGearsArrayFilled" v-bind:key="gears.name">
            <li v-if ="gears.name != null">
            {{gears.name}} - {{gears.gender}} - Size: {{gears.size}} - {{gears.price}}SEK
            </li>
          </div>
        </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import PatchStore from './PatchStore.vue'
import DeleteStoreModal from './DeleteStoreModal.vue'

export default {
  name: 'StoreViewer',
  components: { PatchStore, DeleteStoreModal },
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
      surfLessonArray: [{
        name: '',
        description: ''
      }],
      surfLessonArrayFilled: [{}],
      surfGearsArray: [{
        name: '',
        price: '',
        size: '',
        gender: '',
        description: ''
      }],
      surfGearsArrayFilled: [{}],
      surfBoardsArray: [{
        volume: '',
        price: '',
        size: '',
        style: ''
      }],
      surfBoardsArrayFilled: [{}]
    }
  },
  mounted() {
    console.log('Page is loaded')
    this.getSpot()
  },
  methods: {
    getSpot() {
      // Api.get('/stores/632b6798702d604ee003165b')
      Api.get('/stores/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.store = response.data
          this.surfLessonArray = response.data.surfLessons
          console.log('store api saved')
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
      Api.get('/stores/' + this.$route.params.id + '/surfLessons')
        .then(response => {
          this.surfLessonsArray = response.data
          console.log('lesson api saved')
          this.surfLessonsArray.forEach(this.getLessonData)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
      Api.get('/stores/' + this.$route.params.id + '/surfGears')
        .then(response => {
          this.surfGearsArray = response.data
          console.log('gear api saved')
          this.surfGearsArray.forEach(this.getGearData)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
      Api.get('/stores/' + this.$route.params.id + '/surfBoards')
        .then(response => {
          this.surfBoardsArray = response.data
          console.log('board api saved')
          this.surfBoardsArray.forEach(this.getBoardData)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },
    getLessonData(index) {
      Api.get('/surfLessons/' + index)
        .then(response => {
          console.log(response.data)
          this.surfLessonArrayFilled.push(response.data)
          console.log('surflessonsarrayfilled')
          console.log(this.surfLessonArrayFilled)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },
    getGearData(index) {
      Api.get('/surfGears/' + index)
        .then(response => {
          console.log(response.data)
          this.surfGearsArrayFilled.push(response.data)
          console.log('surfgearsarrayfilled')
          console.log(this.surfGearsArrayFilled)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },
    getBoardData(index) {
      Api.get('/surfBoards/' + index)
        .then(response => {
          console.log(response.data)
          this.surfBoardsArrayFilled.push(response.data)
          console.log('surfboardsarrayfilled')
          console.log(this.surfBoardsArrayFilled)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    }
  },
  create() {
    this.token = localStorage.getItem('user')
  }
}

</script>

<style scoped>
.col-12 {
  height: 60px;
  background-color: lightgray;
}

.col-4 {
  min-height: 250px;
  background-color: lightgray;
}

.col-8 {
  min-height: 250px;
  background-color: lightgray;
}
.container {
  background-color: lightgray;
}

#col_right {
  text-align: left;
}

#adress_text {
  text-align: center;
}

#offersListItem {
  text-align: left;
}

@media all and (max-width: 1199px) {
  #col_right {
    min-width: 25% ;
  }
  #col-adress {
    min-width: 25% ;
  }
  #lower-col {
    min-width: 75% ;
  }
  #image-col {
    max-width: 25% ;
    min-width: 24% ;
  }
  #store-image {
    width: 100% ;
  }
}

@media all and (max-width: 800px) {
  #col_right {
    min-width: 50% ;
  }
  #col-adress {
    min-width: 50% ;
  }
  #lower-col {
    min-width: 100% ;
  }
  #image-col {
    display: none;
  }
}

@media all and (max-width: 500px) {
  #col_right {
    min-width: 100% ;
    min-height: 10% ;
  }
  #col-adress {
    min-width: 100% ;
    min-height: 10% ;
  }
  #lower-col {
    min-width: 100% ;
    min-height: 10% ;
  }
  #image-col {
    display: none;
  }
}

</style>
