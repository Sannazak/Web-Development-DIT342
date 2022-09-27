<template>
  <div>
    <Banner />
    <div v-for="SurfSpot in surfSpots" v-bind:key="SurfSpot._id">
      <div id="title_container" class="container-lg">
        <h1> You are viewing: {{SurfSpot.name}} </h1>

      </div>
      <div class="container text-center">
        <div class="row align-items-start">
          <div class="col">
            <img src="../assets/surfspots/surf_spot_1.jpg" class="rounded" alt="image of spot" width="400px">
          </div>
          <div id="spot_summary" class="col">
            <p>Description: {{SurfSpot.description}}</p>
            <li>Surf</li>
            <li>Beach</li>
            <li>Near store</li>
            <li>Private</li>
            <li>Beginner friendly</li>
          </div>
          <div class="col">
            One of three columns
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col">
            <hr>
          </div>
          <div class="col">
            <hr>
          </div>
          <div class="col">
            <hr>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col">
            <img src="../assets/surfspots/maps-google.jpg" class="rounded" alt="image of spot" width="400px">
          </div>
          <div class="col">
            <p>How to get here:</p>
            <p>{{SurfSpot.adress.street}} {{SurfSpot.adress.streetNr}}<br>
              {{SurfSpot.adress.postalCode}} {{SurfSpot.adress.city}}<br>
              {{SurfSpot.adress.country}}
              <br><br>
              GPS:<br>
              {{SurfSpot.location.longitude}},{{SurfSpot.location.latitude}}
            </p>

          </div>
          <div class="col">
            One of three columns
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Banner from '../components/Banner.vue'
import { Api } from '@/Api'

export default {
  name: 'surfSpots',
  components: {
    Banner
  },
  methods: {
    getSpot() {
      Api.get('/surfSpots/6320e45227845b66e84d87b0')
        .then(response => {
          console.log(response.data)
          this.surfSpots = response.data.surfSpots
          console.log('api saved')
          console.log(this.surfSpots)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
        // executes regardless of failure or success
        })
    }
  },
  data() {
    return {
      name: '',
      description: '',
      location: {
        longitude: '',
        latitude: ''
      },
      adress: {
        country: '',
        street: '',
        streetNr: '',
        postalCode: '',
        city: ''
      }
    }
  },
  mounted() {
    console.log('Page is loaded')
    this.getSpot()
  }
}
</script>

<style scoped>
#big_container {
  height: 500px;
}

#image_container {
  width: 400px;
  align-self: left;
}

#map {
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}

#spot_summary {
  text-align: left;
  list-style-type: circle;
}
</style>

<!-- {
  _id: '6320e45227845b66e84d87b0',
  name: 'Roca Bruja',
  description: 'Big rock on the spot',
  location: {
    longitude: '434324',
    latitude: '543545'
  },
  adress: {
    country: 'Costa Rica',
    street: 'San Jose',
    streetNr: '45',
    postalCode: '4556',
    city: 'San Jose'
  }
} -->
