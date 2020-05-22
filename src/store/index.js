import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import auth from './auth'
import organization from './organization'
import petitions from './petitions'

const reducer = combineReducers({
  auth,
  organization,
  petitions
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

export default store