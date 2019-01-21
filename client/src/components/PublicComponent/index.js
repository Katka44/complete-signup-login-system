import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../../store/reducers";
import { checkUser } from "../../store/actions";

class PublicComponent extends Component {
  componentDidMount() {
    // const { checkUserAction } = this.props;
    // checkUserAction();
  }

  render() {
    const { location, user, component: C } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };
    if (user) {
      return <Redirect to={from} />;
    }
    return <C />;
  }
}

PublicComponent.defaultProps = {
  user: null
};

PublicComponent.propTypes = {
  checkUserAction: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  location: PropTypes.shape({}).isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};

const mapStateToProps = state => ({
  user: getUser(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      checkUserAction: checkUser
    }
  )(PublicComponent)
);
