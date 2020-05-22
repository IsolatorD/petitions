import axios from 'axios'

// const baseURL = 'http://localhost:3333/api'
const baseURL = 'https://paulus.dar.agency/api'
export default class API {
  constructor({token = null, subdomain = '', orgID = ''}) {
    this.orgID = orgID
    this.subdomain = subdomain
    this.token = token
    this.axios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `bearer ${token}`
      }
    })
  }

  login (data) {
    return this.axios.post('/auth/login', data)
  }

  registerUser (data) {
    return this.axios.post(`/petition/${this.subdomain}/registerUser`, data)
  }

  completeRegister (data) {
    return this.axios.post(`/petition/${this.subdomain}/finishRegisterUser`, data)
  }
  getProfile () {
    return this.axios.get(`/profile`)
  }

  updateProfile (data) {
    return this.axios.put('/profile/update', data)
  }

  getOrganizationInfo () {
    return this.axios.get(`/petition/${this.subdomain}/organization`)
  }

  getCountries () {
    return this.axios.get(`/countries`)
  }

  getCategories () {
    return this.axios.get(`/petition/${this.subdomain}/category?type=project`)
  }

  getPetitions () {
    return this.axios.get(`/petition/${this.subdomain}/projects`)
  }

  getPetition (id) {
    return this.axios.get(`/petition/${this.subdomain}/projects/${id}`)
  }

  createPetition (data) {
    return this.axios.post(`o/${this.orgID}/petition/create`, data)
  }
}