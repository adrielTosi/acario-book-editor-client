import React from "react";

import { usePrivateRoute } from "lib/auth";
import { withApollo } from "apollo/withApollo";
import { useAppLogout } from "lib/auth";

const Dashboard = () => {
  usePrivateRoute();
  const logout = useAppLogout();
  return (
    <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
      <div className="column is-8">
        <h1 className="has-text-weight-semibold">Dashboard</h1>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};



export default withApollo(Dashboard);