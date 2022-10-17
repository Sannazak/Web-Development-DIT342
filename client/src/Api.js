import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api/'
  // baseURL: 'https://warm-mountain-00015.herokuapp.com/api'
})

//  process.env.VUE_APP_API_ENDPOINT ||
