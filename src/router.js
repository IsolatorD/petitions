import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Login from './templates/custom/tufirma/login'
import Register from './templates/custom/tufirma/register'
import Home from './templates/custom/tufirma/Home'
import Profile from './templates/custom/tufirma/profile'
import MyPetitions from './templates/custom/tufirma/MyPetitions'

import CampaignSteps from './templates/custom/tufirma/CampaignSteps'

import Landing from './templates/custom/tufirma'
import Search from './templates/custom/tufirma/search'
import Interna from './templates/custom/tufirma/Interna'
import Thanks from './templates/custom/tufirma/thanks'
import NotFound from './templates/custom/tufirma/NotFound'

import ScrollToTop from './components/ScrollToTop'

export default function Routes() {
  return (
    <Router>
      <ScrollToTop/>
      <Switch>
        <Route exact path="/:name">
          <Landing />
        </Route>
        <Route exact path="/:name/search">
          <Search />
        </Route>
        <Route path="/:name/login">
          <Login />
        </Route>
        <Route path="/:name/signup">
          <Register />
        </Route>
        <Route path="/:name/log">
          <Home />
        </Route>
        <Route path="/:name/profile">
          <Profile />
        </Route>
        <Route path="/:name/mypetitions">
          <MyPetitions />
        </Route>
        <Route path="/:name/publish">
          <CampaignSteps />
        </Route>
        <Route path="/:name/campaign/:id">
          <Interna />
        </Route>
        <Route path="/:name/thanks">
          <Thanks />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}