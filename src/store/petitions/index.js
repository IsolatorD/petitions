import * as types from './types'

let defaultState = {
  categories: [],
  petitions: [],
  petition: null
}

const petitions = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return { ...state, categories: action.payload }
    case types.SET_PETITIONS:
      return { ...state, petitions: action.payload }
    case types.SET_PETITION:
      return { ...state, petition: action.payload }
    default:
      return state
  }
}

export default petitions