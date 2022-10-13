<template>
  <div>
    <banner />
    <b-container class="container">
      <b-row>
        <b-col id="column1" lg="7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1077856.9141138643!2d11.910334368615487!3d57.29997411190756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssurfing%20strand!5e0!3m2!1ssv!2sse!4v1665078034099!5m2!1ssv!2sse"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d646961.561543493!2d12.18590388377194!3d57.17369962902062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46502afdf4948aa9%3A0x4796738c26545be4!2sFahl%C3%A9nSurf%20Uthyrning%20%26%20Kurscenter!5e0!3m2!1ssv!2sse!4v1665078361609!5m2!1ssv!2sse"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </b-col>
        <b-col id="column2" lg="5">
          <h3 class="recommended" lg="5">Recommended Stores:</h3>
          <b-card-group
            deck
            id="deck-cards"
            v-for="stores in store"
            v-bind:key="stores._id"
          >
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
          this.store = response.data.slice(20, 22)
          console.log('api saved')
          console.log(this.store)
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          // always executes
        })
    }
  }, /*
    getTopStores() {
      Api.get('/stores/?name=Fahlén Surf')
        .then((response) => {
          this.store = response.data
          console.log()
          console.log(this.store)
        })
        .catch((error) => {
          console.log(error)
        })
    }, */
  OnClick(id) {
    // change view to show one store
    console.log(id)
    window.location = 'StoreView/' + id
  }
}
</script>

<style>
#column1 {
  /*    background-color: blue; */
  margin-top: 10px;
}
#column2 {
  /*   background-color: aqua; */
  margin-top: 10px;
}
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
</style>
