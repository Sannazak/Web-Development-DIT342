<template>
  <div>
    <banner />
    <b-container class="container">
      <b-row>

</b-row>
<div>
  <p id="welcome_explanation">
    Browse through our surf stores and check what they have available. Then start planning your next surf trip!
  </p>
</div>
  <b-row>
    <b-col id="column1" lg="7">
      <div b-col lg="4">
          <h3>Surfshops in your local area:</h3>
        </div>
      <iframe class="w-100" id="mapheight"
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1077856.9141138643!2d11.910334368615487!3d57.29997411190756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssurfing%20strand!5e0!3m2!1ssv!2sse!4v1665078034099!5m2!1ssv!2sse"
        style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </b-col>
    <b-col id="column2" lg="5">
      <div b-col lg="4">
          <h3>Newly Added Stores:</h3>

  </div>
      <b-card-group deck id="deck-cards" v-for="stores in store" v-bind:key="stores._id">
        <b-card id="resultCards" tag="article">
          <b-card-title>
            <h3>{{ stores.name }}</h3>
          </b-card-title>
          <b-card-text> {{ stores.description }} <br /> </b-card-text>
          <b-button variant="dark" v-on:click="OnClick(stores._id)">
            Visit Store
          </b-button>
        </b-card>
      </b-card-group>
    </b-col>
  </b-row>
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Banner from '@/components/Banner.vue'

export default {
  name: 'home',
  components: { Banner },
  mounted() {
    console.log('page is loaded')
    this.getTopStores()
  },
  data() {
    return {
      storeAmount: '',
      store: [
        {
          _id: '',
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
        }
      ]
    }
  },
  methods: {
    getTopStores() {
      Api.get('/stores/')
        .then((response) => {
          console.log(response.data)
          this.storeAmount = response.data.length
          console.log(this.storeAmount)
          this.store = response.data.slice(this.storeAmount - 2, this.storeAmount)
          console.log('api saved')
          console.log(this.store)
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          // always executes
        })
    },
    OnClick(id) {
      // change view to show one store
      console.log(id)
      window.location = 'StoreView/' + id
    }
  }
}
</script>

<style>

.deck-cards {
  align-items: center;
  background-color: #054e47af;
  color: white;
  text-align: center;
  width: 50px;
  margin-bottom: 25px;
  margin-top: 120px;
}

#resultCards {
  background-color: #054e47af;
  color: white;
  text-align: center;
  margin-bottom: 25px;
}

.container {
  margin-top: 30px;
}

.recommended {
  margin-bottom: 20px;
  text-align: center;
}

#photo {
  margin-top: 20px;
}

#welcome_explanation {
  font-size: 18px;
}

@media (min-width: 1199px) {
  #mapheight {
    height: 600px;
  }
}

@media (max-width: 1199px) {
  #mapheight {
    height: 700px;
  }
}

@media (max-width: 991px) {
  #mapheight {
    height: 400px;
  }
}
</style>
