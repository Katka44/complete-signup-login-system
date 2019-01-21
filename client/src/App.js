import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { getUser } from "./store/reducers";

import PrivateRoute from "./components/PrivateRoute";
import PublicComponent from "./components/PublicComponent";

import Login from "./components/Login";

import PropTypes from "prop-types";

const renderPrivateRoutes = [
  {
    path: "/",
    allowedRoles: ["user", "admin"],
    component: <p>Dashboard</p>,
    name: "Dashboard"
  },
  {
    path: "/signUpRequests",
    allowedRoles: ["admin"],
    component: <p>SignUpRequests</p>,
    name: "Requests"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // <p>1. getUser checks for current user</p>
  // <p>2. if no user, redirect to /login</p>
  // <p>3. if user, show dashboard</p>
  // <p>3. if user is admin, show route to signup requests</p>

  render() {
    const { user } = this.props;

    const routes = (
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <PublicComponent component={Login} />}
        />
        {/* <Route
          exact
          path="/forgot-password"
          render={() => <PublicComponent component={<p>ForgotPassword</p>} />}
        />
        <Route
          exact
          path="/users/verify"
          render={() => <PublicComponent component={<p>VerifyPassword</p>} />}
        /> */}
        {renderPrivateRoutes.map(route => (
          <PrivateRoute
            key={route.name}
            exact
            path={route.path}
            isAllowed={route.allowedRoles}
            component={route.component}
            name={route.name}
          />
        ))}
      </Switch>
    );

    console.log(user);
    return (
      <div className="App">
        <div className={user ? "App-body" : "App-body login"}>{routes}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

App.propTypes = {
  state: PropTypes.shape({})
};

export default withRouter(connect(mapStateToProps)(App));
