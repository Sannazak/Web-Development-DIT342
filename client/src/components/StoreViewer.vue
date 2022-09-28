<template>
    <div class="container">
        <div class="row">
            <div id="col_header" class="col-12"><h3>{{store.name}} in {{store.adress.city}}</h3></div>
            <div id="col_left" class="col-4">
                <img src="../assets/surfspots/surf_spot_1.jpg" class="rounded" alt="image of spot" width="350px"> <br><br><br><br>
                <img src="../assets/surfspots/maps-google.jpg" class="rounded" alt="image of spot" width="350px">
            </div>
            <div id="col_right" class="col-4">
                 <p>About {{store.name}}<br>
            This should be a description of the store and so on.
            </p>
</div>
<div class="col-4">
                 <p>How to get here:<br>
            {{store.adress.street}} {{store.adress.streetNr}}<br>
              {{store.adress.postalCode}} {{store.adress.city}}<br>
              {{store.adress.country}}
            </p>
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
    console.log('Page is loaded')
    this.getSpot()
  },
  methods: {
    getSpot() {
      Api.get('/stores/632b6798702d604ee003165b')
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
</style>
