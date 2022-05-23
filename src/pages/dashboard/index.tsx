import { withApollo } from "apollo/withApollo";
import { WithSidebar } from "components/Navigation/Sidebar";
import { StoryCard } from "components/StoryCard/StoryCard";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { GetUserQuery } from "graphql/generated/graphqlTypes";
import {
  ssrCurrentUser,
  ssrGetUser,
  useGetTimelineTales,
} from "graphql/generated/page";
import { usePrivateRoute } from "lib/auth";
import { last } from "lodash";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import theme from "styles/theme";
import { ServerSideProps } from "types/ServerSideProps";

type HomeProps = ServerSideProps<GetUserQuery>;

const Dashboard: NextPage<HomeProps> = (props) => {
  usePrivateRoute();
  const { data, loading, error, fetchMore } = useGetTimelineTales(() => ({
    variables: { take: 2 },
  }));
  if (props.error) {
    return <div className="has-text-centered">{props.error}</div>;
  }

  const handleFetchMore = async () => {
    const chapters = data?.getTimelineChapters.chapters;
    if (chapters) {
      const cursor = last(chapters)?.createdAt;
      await fetchMore({ variables: { take: 2, cursor } });
    }
  };

  return (
    <Box className="container" position="relative">
      <WithSidebar data={props.data} isDashboard={true}>
        {loading ? (
          <Box textAlign="center">Loading . . .</Box>
        ) : error ? (
          <Box>{error.message}</Box>
        ) : (
          <>
            {data?.getTimelineChapters.chapters.map((chapter) => (
              <StoryCard
                {...chapter}
                showActions={{ readLater: true }}
                format="horizontal"
                key={chapter.id}
              />
            ))}

            {data?.getTimelineChapters.hasMore && (
              <Box
                textAlign="center"
                borderTop={`1px solid ${theme.colors.comp_outline}`}
                pt="1em"
              >
                <Button onClick={handleFetchMore} lined>
                  More...
                </Button>
              </Box>
            )}
          </>
        )}
      </WithSidebar>
    </Box>
  );
};

export default withApollo(Dashboard);

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
