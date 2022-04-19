import { withApollo } from "apollo/withApollo";
import { NextPage } from "next";
import React from "react";
import { H1, H2 } from "components/typography/Heading"

const Home: NextPage = (props) => {
  return (
    <div className="container">
      <div className="">
        <H1>Welcome to Scrivono</H1>
        <H2>A place for short stories</H2>
      </div>
    </div>
  );
}

export default withApollo(Home)
