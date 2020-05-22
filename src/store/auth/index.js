import * as types from './types'

let defaultState = {
  user: null,
  token: null
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case types.INSERT_TOKEN:
      return { ...state, token: action.token }
    case types.LOGIN:
      return { ...state, user: action.payload }
    case types.UPDATE_USER:
        return { ...state, user: action.payload }
    default:
      return state
  }
}

export default auth