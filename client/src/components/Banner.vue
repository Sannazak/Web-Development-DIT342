<template>
  <div class="container">
    <img class="image" src="../assets/banner_photo.jpg" alt="Surf Photo" />
    <div class="text-block">
      <h6>Welcome!</h6>
      <p>
        The days of carrying heavy surfbags and gears through airports is over.
        Find all the stores, boards, gears and lessons on your next surftrip and
        keep the stoke!
      </p>
    </div>
    <form action="https://www.google.com" method="get" class="search-bar">
      <input type="text" placeholder="Search for location or shop" name="q" />
      <button type="submit" @click="getMessage()">
        <img src="../assets/search.png" />
      </button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
export default {
  name: 'banner',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  padding-left: 1px;
  padding-top: 1px;
  display: flex;
  align-items: right;
  justify-content: right;
}
.search-bar {
  width: 100%;
  max-width: 250px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  position: absolute;
  border-radius: 60px;
  bottom: 8px;
  right: 28px;
  padding: 5px 10px;
  backdrop-filter: blur(1px);
}

.search-bar input {
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 6px 5px;
  font-size: 15px;
  color: #f7f9f9;
}

::placeholder {
  color: #f7f9f9;
}

.search-bar button img {
  width: 15px;
}

.search-bar button {
  border: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #054e47;
  cursor: pointer;
}
.image {
  width: 100%;
  background-size: cover;
  object-fit: scale-down;
  min-height: 100%;
  bottom: 0%;
}

.text-block {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 1000px;
  font-size: normal;
  background-color: rgba(0, 0, 0, 0.478);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  width: 20%;
  height: 90%;
}
</style>
