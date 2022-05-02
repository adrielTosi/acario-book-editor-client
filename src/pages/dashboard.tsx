import React from "react";
import Link from "next/link";
import { StoryCard } from "components/StoryCard/StoryCard";
import { withApollo } from "apollo/withApollo";
import { GetServerSideProps, NextPage } from "next";
import { ssrCurrentUser, ssrGetUser } from "graphql/generated/page";
import { GetUserQuery } from "graphql/generated/graphqlTypes";
import { ServerSideProps } from "types/ServerSideProps";
import { usePrivateRoute } from "lib/auth";

type HomeProps = ServerSideProps<GetUserQuery>;

const Dasboard: NextPage<HomeProps> = (props) => {
  usePrivateRoute();
  if (props.error) {
    return <div className="has-text-centered">{props.error}</div>;
  }
  return (
    <div className="container">
      <div className="columns is-multiline is-full-height">
        {props.data.getUser.chapters.map((chapter) => (
          <div className="column is-3" key={chapter.id}>
            <StoryCard {...chapter} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default withApollo(Dasboard);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // IS THIS CALL NECESSARY? PROBABLY NOT
    const user = await ssrCurrentUser.getServerPage(
      {
        notifyOnNetworkStatusChange: true,
        context: {
          headers: {
            cookie: context.req.headers.cookie,
          },
        },
      },
      context
    );
    const res = await ssrGetUser.getServerPage(
      {
        variables: { username: user.props.data.currentUser.username },
        notifyOnNetworkStatusChange: true,
        context: {
          headers: {
            cookie: context.req.headers.cookie,
          },
        },
      },
      context
    );
    return res;
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};
