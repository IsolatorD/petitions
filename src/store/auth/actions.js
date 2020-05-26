import * as Types from './types'
import API from '../../api'

export const getProfile = (token = null) => {
  return async (dispatch, getState) => {
    const api = new API({token: token || getState().auth.token})
    try {
      const response = (await api.getProfile()).data
      dispatch({
        type: Types.LOGIN,
        payload: response
      })
    } catch (error) {
      console.log('Error getProfile', error)
    }
  }
}

export const updateProfile = (data) => {
  return async (dispatch, getState) => {
    const api = new API({token: getState().auth.token})
    try {
      const response = (await api.updateProfile(data)).data
      dispatch(getProfile())
    } catch (error) {
      console.log('Error updateProfile', error)
    }
  }
}

export const verifyToken = () => {
  return (dispatch) => {
    const token = localStorage.getItem('tk')
    if (token) {
      dispatch({
        type: Types.INSERT_TOKEN,
        token: token
      })
      dispatch(getProfile(token))
    }
  }
}

export const setToken = (token) => {
  return dispatch => {
    dispatch ({
      type: Types.INSERT_TOKEN,
      token: token
    })
  }
}

export const getMyPetitions = () => {
  return async (dispatch, getState) => {
    const api = new API({token: getState().auth.token, orgID: getState().organization.organization.id})

    try {
      const response = (await api.getMyPetitions()).data
      dispatch({
        type: Types.SET_MY_PETITIONS,
        payload: response.data
      })
    } catch (error) {
      console.log('Error getMyPetitions', error)
    }
  }
}