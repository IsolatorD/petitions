import * as Types from './types'
import API from '../../api'

export const getCategories = () => {
  return async (dispatch, getState) => {
    const api = new API({subdomain: getState().organization.subdomain})
    try {
      const response = (await api.getCategories()).data
      response.map((ct) => {
        switch(ct.name) {
          case 'Defensa de la vida':
            return ct.icon = require('../../assets/icons/tufirma/1.svg')
          case 'Libertad Religiosa':
            return ct.icon = require('../../assets/icons/tufirma/2.svg')
          case 'Apoyo a sacerdotes o religiosos':
            return ct.icon = require('../../assets/icons/tufirma/3.svg')
          case 'Catedrales monumentos y parroquias':
            return ct.icon = require('../../assets/icons/tufirma/4.svg')
          case 'Peticiones a politicos':
            return ct.icon = require('../../assets/icons/tufirma/5.svg')
          case 'Educación':
            return ct.icon = require('../../assets/icons/tufirma/6.svg')
          case 'Apoyo a movimientos de la iglesia':
            return ct.icon = require('../../assets/icons/tufirma/7.svg')
          case 'Culto':
            return ct.icon = require('../../assets/icons/tufirma/8.svg')
          case 'Otras':
            return ct.icon = require('../../assets/icons/tufirma/9.svg')
          default:
            return ct
        }
      })
      dispatch({
        type: Types.SET_CATEGORIES,
        payload: response
      })
    } catch (error) {
      console.log('Error get categories: ', error)
    }
  }
}

export const getPetitions = () => {
  return async (dispatch, getState) => {
    const api = new API({subdomain: getState().organization.subdomain})
    try {
      const response = (await api.getPetitions()).data
      dispatch({
        type: Types.SET_PETITIONS,
        payload: response.data
      })
    } catch (error) {
      console.log('Error get petitions: ', error)
    }
  }
}

export const getPetition = (id) => {
  return async (dispatch, getState) => {
    const api = new API({subdomain: getState().organization.subdomain})
    try {
      const response = (await api.getPetition(id)).data
      dispatch({
        type: Types.SET_PETITION,
        payload: response
      })
    } catch (error) {
      console.log('Error get petition: ', error)
    }
  }
}