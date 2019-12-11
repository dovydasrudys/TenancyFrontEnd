import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

import Test from "./containers/Test";

export default function App() {
  return (
    <div>
      <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Route path={"/test"} component={Test}/>
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/"} />
      </div>
      </Router>
    </div>
  );
}