import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import "./style.scss";

import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Contract from "./containers/Contract/Contract";

import Test from "./containers/Test";
import Page from "./components/Page";
import Home from "./containers/Home";
import MyHub from "./containers/MyHub/MyHub";
import AdDetails from "./components/AdDetails";


export default function App() {
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div>
        <Switch>
          <Route exact path={"/test"}><Test></Test></Route>
          <Route exact path={"/login"}><Login></Login></Route>
          <Route exact path={"/register"}><Register></Register></Route>
          <Page>
            <Route exact path={"/"}><Home></Home></Route>
            <Route exact path={"/contract"}> <Contract /> </Route>
            <Route exact path={"/myhub"}><MyHub></MyHub></Route>
            <Route exact path={"/ad"}><AdDetails></AdDetails></Route>
          </Page>
        </Switch>
      </div>
    </Router>

  );
}