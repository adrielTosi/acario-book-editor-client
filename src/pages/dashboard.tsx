import React from "react";

import PillarLayout from "components/layout/PillarLayout";
import usePrivateRoute from "lib/usePrivateRoute";
import { withApollo } from "apollo/withApollo";

const Dashboard = () => {
  usePrivateRoute();
  return (
    <PillarLayout>
      <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
        <div className="column is-8">
          <h1 className="has-text-weight-semibold">Dashboard</h1>
        </div>
      </div>
    </PillarLayout>
  );
};

export default withApollo(Dashboard);
