<template>
    <div class="container">
        <img class="image" src="../assets/banner_photo.jpg" alt="Surf Photo" fluid/>
        <div id="text-container" class="text-block">
            <h6>Welcome to Surf Rentals!</h6>
            <p>The days of carrying heavy surfbags and gears through airports is over.
                Find all the stores, boards, gears and lessons on your next surftrip and keep the stoke!
            </p>
        </div>
        <div id="dropdown-menu">
          <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
          <b-button-group class="mx-1">
            <b-button v-if="this.$route.path !== '/'" id="menuButtons" href="/">
              <b-icon icon="house-fill" aria-hidden="true" font-scale="1.5"></b-icon>
            </b-button>
            <b-button id="menuButtons" href="/searchResult">Stores</b-button>
            <registration/>
            <LoginPopUp/>
          </b-button-group>
          <b-dropdown id="userButton" v-if="token" class="mx-1" right text="menu">
            <template #button-content>
              <b-icon icon="person-fill" aria-hidden="true"></b-icon> User
            </template>
            <b-dropdown-item href="/user">Profile</b-dropdown-item>
            <Logout/>
          </b-dropdown>
        </b-button-toolbar>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import registration from './Registration'
import LoginPopUp from './LoginPopUp.vue'
import Logout from './LogOut'

export default {
  name: 'banner',
  components: { registration, LoginPopUp, Logout },
  data() {
    return {
      message: 'none',
      token: ''
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
  },
  created() {
    this.token = localStorage.getItem('user')
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
#dropdown-menu {
  position: absolute;
  bottom: 8px;
  right: 28px;
}
#menuButtons {
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 25px;
  border-radius: 10%;
}
#userButton{
  margin-top: 25px;
}
@media all and (max-width: 1200px) {
  #text-container {
    width: 25%;
  }
}
@media all and (max-width: 1000px) {
  #text-container {
    scale: 80%;
    width: 40%;
  }
}

@media all and (max-width: 800px) {
  #text-container {
    display: none;
  }
}
</style>
