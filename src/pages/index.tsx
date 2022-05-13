import { withApollo } from "apollo/withApollo";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { H1, H2 } from "components/typography/Heading";
import Link from "next/link";
import { Button } from "components/ui/Button";
import { useAppLogout } from "lib/auth";
import { useCurrentUser } from "graphql/generated/page";
import { useStore } from "store/globalState";

const Home: NextPage = (_) => {
  const logout = useAppLogout();

  return (
    <div className="container">
      <div className="">
        <H1>Welcome to Scrivono</H1>
        <H2>A place for short stories</H2>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/showcase">Showcase</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <Button onClick={() => logout()}>Logout</Button>
        </ul>
      </div>
    </div>
  );
};

export default withApollo(Home);
