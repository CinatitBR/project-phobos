import { Switch, Route } from 'react-router-dom'

import Sidebar from '../Sidebar'
import Home from '../../pages/Home'
import Explore from '../../pages/Explore'

import './index.css' 

function MainLayout() {
  return (
    <div id="app">
      <Sidebar/>

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/explore">
          <Explore />
        </Route>

      </Switch>
    </div>
  )
}

export default MainLayout
