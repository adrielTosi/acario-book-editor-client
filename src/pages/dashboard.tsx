import React from "react";

import PillarLayout from "components/layout/PillarLayout";
import { usePrivateRoute } from "lib/auth";
import { withApollo } from "apollo/withApollo";
import { useAppLogout } from "lib/auth";

const Dashboard = () => {
  usePrivateRoute();
  const logout = useAppLogout();
  return (
    <PillarLayout>
      <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
        <div className="column is-8">
          <h1 className="has-text-weight-semibold">Dashboard</h1>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </PillarLayout>
  );
};

export default withApollo(Dashboard);
