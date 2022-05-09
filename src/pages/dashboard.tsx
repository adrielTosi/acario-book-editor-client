import { withApollo } from "apollo/withApollo";
import { WithSidebar } from "components/Sidebar";
import { StoryCard } from "components/StoryCard/StoryCard";
import { Box } from "components/ui/Box";
import { GetUserQuery } from "graphql/generated/graphqlTypes";
import { ssrCurrentUser, ssrGetUser } from "graphql/generated/page";
import { usePrivateRoute } from "lib/auth";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { ServerSideProps } from "types/ServerSideProps";

type HomeProps = ServerSideProps<GetUserQuery>;

const Dasboard: NextPage<HomeProps> = (props) => {
  usePrivateRoute();
  if (props.error) {
    return <div className="has-text-centered">{props.error}</div>;
  }
  return (
    <Box className="container" position="relative">
      <WithSidebar data={props.data} displayFollow={false}>
        <div className="columns is-multiline">
          {props.data.getUser.chapters.map((chapter) => (
            <div className="column is-6-tablet is-4-desktop" key={chapter.id}>
              <StoryCard {...chapter} />
            </div>
          ))}
        </div>
      </WithSidebar>
    </Box>
  );
};

export default withApollo(Dasboard);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // IS THIS CALL NECESSARY? PROBABLY NOT -- maybe better make an optional id search in the backend
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
