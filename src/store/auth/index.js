import * as types from './types'

let defaultState = {
  user: null,
  token: null,
  petitions: []
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case types.INSERT_TOKEN:
      return { ...state, token: action.token }
    case types.LOGIN:
      return { ...state, user: action.payload }
    case types.UPDATE_USER:
      return { ...state, user: action.payload }
    case types.SET_MY_PETITIONS:
      return { ...state, petitions: action.payload }
    default:
      return state
  }
}

export default auth