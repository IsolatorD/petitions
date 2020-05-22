import * as Types from './types'
import API from '../../api'

export const setSubdomain = (subdomain) => {
  return dispatch => {
    dispatch({
      type: Types.SET_SUBDOMAIN,
      payload: subdomain
    })
  }
}

export const getOrganizationInfo = () => {
  return async (dispatch, getState) => {
    const api = new API({subdomain: getState().organization.subdomain})
    try {
      const response = (await api.getOrganizationInfo()).data
      dispatch({
        type: Types.SET_ORGANIZATION,
        payload: response
      })
    } catch (error) {
      console.log('Error get organization: ', error)
    }
  }
}

export const getCountries = () => {
  return async dispatch => {
    const api = new API({})
    try {
      const response = (await api.getCountries()).data
      dispatch({
        type: Types.SET_COUNTRIES,
        payload: response
      })
    } catch (error) {
      console.log('Error get countries: ', error)
    }
  }
}