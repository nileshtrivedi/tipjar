import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import { getAuth } from "services/auth";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ThankYou from "./ThankYou";
import InvalidRoute from "./InvalidRoute";

const PrivateRoute = ({ children, ...rest }) => {
  const { firebaseUid } = getAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        firebaseUid ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const Screens = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/thank_you">
            <ThankYou />
          </Route>
          <Route path="/404">
            <InvalidRoute />
          </Route>
          <Route path="/:vanityName">
            <Profile />
          </Route>
          <Route>
            <InvalidRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return (
    <>
      <h2>Home</h2>
      <Link to="/signin">Signin</Link>
    </>
  );
}

export default Screens;
