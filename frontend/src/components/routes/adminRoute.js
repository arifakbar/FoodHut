import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./loadingToRedirect";

function AdminRoute(props) {
  const { user, ...rest } = props;

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(AdminRoute);
