import axios from 'axios'

export const Api = axios.create({
  baseURL: 'https://warm-mountain-00015.herokuapp.com/api'
})
