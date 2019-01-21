import React from "react";
import { PropTypes } from "prop-types";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { getUser } from "../../store/reducers";
import navigationItems from "./navigationItems";

const PrivateRoute = ({
  isAllowed,
  component: Component,
  user,
  name,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!user) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
      const PageComponents = [];

      const renderingComponent = navigationItems.find(
        item => item.label === name
      );

      if (renderingComponent) {
        renderingComponent.subNavigationItems.forEach(subNavItem => {
          if (subNavItem.role.includes(user.role)) {
            PageComponents.push(subNavItem);
          }
        });
      }

      return isAllowed.includes(user.role) ? (
        <Component PageComponents={PageComponents} {...props} />
      ) : (
        <div>not allowed</div>
      );
    }}
  />
);

PrivateRoute.defaultProps = {
  user: null
};

PrivateRoute.propTypes = {
  user: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
  checkUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: getUser(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(PrivateRoute)
);
