<template>
    <div class="container">
        <div class="row">
            <div id="col_header" class="col-12"><h3>{{store.name}} in {{store.adress.city}}</h3></div>
            <div id="col_left" class="col-4">
                <img src="../assets/stores/surfshop1.jpg" class="rounded" alt="image of spot" width="350px"> <br><br><br><br>
                <img src="../assets/maps-google.jpg" class="rounded" alt="image of spot" width="350px">
            </div>
            <div id="col_right" class="col-4">
                 <p><b>About {{store.name}}</b><br>
                {{store.description}}
                  <hr>
                <p id="adress_text">How to get here:<br>
            {{store.adress.street}} {{store.adress.streetNr}}<br>
              {{store.adress.postalCode}} {{store.adress.city}}<br>
              {{store.adress.country}}
            </p>

</div>
<div class="col-4">
    <p>
    Surflessons available:
    <ul>
    <li v-for="lesson in store.surfLessons" v-bind:key="lesson.name">{{lesson}}</li>
    </ul>
    </p>
    <hr>
    <p>
    Surfboards available:
    <ul>
    <li v-for="board in store.surfBoards" v-bind:key="board.name">{{board}}</li>
    </ul>
    </p>
    <hr>
    <p>
    Surfgear available:
    <ul>
    <li v-for="gear in store.surfGears" v-bind:key="gear.name">{{gear}}</li>
    </ul>
    </p>
    <hr>
</div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'StoreViewer',
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
      surfLessonArray: [{
        name: '',
        price: '',
        instructor: ''
      }],
      surfLesson: {
        name: '',
        price: '',
        instructor: ''
      }
    }
  },
  mounted() {
    console.log('Page is loaded')
    this.getSpot()
    console.log(this.store.surfLessons.lenght)
  },
  methods: {
    getSpot() {
      // Api.get('/stores/632b6798702d604ee003165b')
      Api.get('/stores/' + this.$route.params.id)
        .then(response => {
          console.log(response.data)
          this.store = response.data
          console.log('api saved')
          console.log(this.store)
          console.log(this.store.name)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // executes regardless of failure or success
        })
    },
    getLessons() {

    }
  }
}

</script>

<style scoped>
    .col-12 {
        height : 60px;
        background-color: lightgray;
    }
    .col-4 {
        height:550px;
        background-color: lightgray;
    }
    .col-8 {
        height: 550px;
        background-color:pink;
    }
    #col_right {
      text-align: left;
    }
    #adress_text {
      text-align: center;
    }
</style>
