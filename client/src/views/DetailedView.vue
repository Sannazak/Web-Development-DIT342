<template>
<div>
<Banner/>
<div id="title_container" class="container-lg">
  <h1>Roca Bruja</h1>
</div>
<div class="container text-center">
  <div class="row align-items-start">
    <div class="col">
      <img src="../assets/surfspots/surf_spot_1.jpg" class="rounded" alt="image of spot" width="400px">
    </div>
    <div id="spot_summary" class="col">
      <p>Big rock on the spot, this is the description</p>
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
        <p>San Jose Avenue 45<br>
        4556 San Jose<br>
        Costa Rica
      </p>

    </div>
    <div class="col">
      One of three columns
    </div>
  </div>
</div>
</div>
</template>

<script>
import Banner from '../components/Banner.vue'

export default {
  name: 'DetailedView',
  components: {
    Banner
  },
  data() {
    return {
      surfSpot: [{
      }]
    }
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
  text-align : left;
  list-style-type: circle;
}

</style>
