import axios from 'axios'

const api = axios.create({

  baseURL: 'http://129.148.50.73:9005/v1/'

})

export {
  api
}