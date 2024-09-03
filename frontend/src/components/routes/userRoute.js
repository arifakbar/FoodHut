import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import LoadingToRedirect from "./loadingToRedirect";

function UserRoute(props) {
  const { user, ...rest } = props;
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserRoute);
