import * as types from './types'

let defaultState = {
  subdomain: null,
  organization: {
    total_signatures: 0,
    approved_projects: 0
  },
  countries: []
}

const organization = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SUBDOMAIN:
      return { ...state, subdomain: action.payload }
    case types.SET_ORGANIZATION:
      return { ...state, organization: action.payload }
    case types.SET_COUNTRIES:
      return { ...state, countries: action.payload }
    default:
      return state
  }
}

export default organization