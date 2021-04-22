import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components'
import { Home, Success } from './pages'

// E:/Apps/react-kasir-app/KasirApp/kasir-app-backend

export default class App extends Component {
    render() {
        return (
          <Router>
            <NavbarComponent />
            <main>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/success" component={Success} exact />
              </Switch>
            </main>
          </Router>
        )
    }
}
