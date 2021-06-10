import { Switch, Route } from 'react-router-dom'

import Sidebar from '../Sidebar'
import Home from '../../pages/Home'

import './index.css' 

function MainLayout() {
  return (
    <div id="app">
      <Sidebar/>

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

      </Switch>
    </div>
  )
}

export default MainLayout