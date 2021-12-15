import { Switch, Route } from 'react-router-dom'

import Sidebar from '../Sidebar'
import Home from '../../pages/Home'
import Library from '../../pages/Library'
import Explore from '../../pages/Explore'
import Account from '../../pages/Account'

import './index.css' 

function MainLayout() {
  return (
    <div id="app">
      <Sidebar/>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/library">
          <Library />
        </Route>

        <Route exact path="/explore">
          <Explore />
        </Route>

        <Route exact path="/account">
          <Account />
        </Route>
      </Switch>
    </div>
  )
}

export default MainLayout
