import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "../context/authContext"


import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        {/* fijate que al final un Component es una instancia u objeto,asi que AuthProvider es un objeto */}
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} /> 
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
