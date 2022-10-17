import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'https://warm-mountain-00015.herokuapp.com/api'
})
