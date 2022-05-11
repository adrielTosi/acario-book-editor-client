import { gql, useApolloClient } from "@apollo/client";
import { withApollo } from "apollo/withApollo";
import { WithSidebar } from "components/Sidebar";
import { StoryCard } from "components/StoryCard/StoryCard";
import { Box } from "components/ui/Box";
import { GetUserQuery } from "graphql/generated/graphqlTypes";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "graphql/generated/mutations";
import { ssrGetUser, useCurrentUser } from "graphql/generated/page";
import { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import { ServerSideProps } from "types/ServerSideProps";

type UserProps = ServerSideProps<GetUserQuery>;

const Username: NextPage<UserProps> = (props) => {
  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const currentUser = useCurrentUser();
  const client = useApolloClient();

  const followData = client.readFragment<{
    followers: {
      leaderId: string;
      followId: string;
    }[];
  }>({
    id: "User:" + props.data.getUser.id,
    fragment: gql`
      fragment follow on User {
        followers
      }
    `,
  });

  const handleFollow = async () => {
    try {
      await follow({
        variables: { id: props.data.getUser.id },
        update(cache) {
          cache.modify({
            id: "User:" + props.data.getUser.id,
            fields: {
              followers() {
                return [
                  {
                    leaderId: props.data.getUser.id,
                    followId: currentUser.data?.currentUser.id,
                  },
                ];
              },
            },
          });
        },
      });
      toast(`Followed ${props.data.getUser.username}`, {
        toastId: `follow-${props.data.getUser.id}`,
      });
    } catch (err: any) {
      toast((err as any).message, { toastId: props.data.getUser.id });
    }
  };

  const handleUnfollow = () => {
    try {
      unfollow({
        variables: { id: props.data.getUser.id },
        update(cache) {
          cache.modify({
            id: "User:" + props.data.getUser.id,
            fields: {
              followers() {
                return [];
              },
            },
          });
        },
      });
      toast(`Unfollowed ${props.data.getUser.username}`, {
        toastId: `unfollow-${props.data.getUser.id}`,
      });
    } catch (err: any) {
      toast((err as any).message, { toastId: props.data.getUser.id });
    }
  };

  if (props.error) {
    return <div className="has-text-centered">{props.error}</div>;
  }
  return (
    <Box className="container" position="relative">
      <WithSidebar
        data={props.data}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        currentUserAlreadyFollows={
          followData &&
          followData.followers[0]?.followId === currentUser.data?.currentUser.id
        }
      >
        <div className="columns is-multiline">
          {props.data.getUser.chapters.map((chapter) => (
            <div className="column is-6-tablet is-4-desktop" key={chapter.id}>
              <StoryCard {...chapter} format="vertical" />
            </div>
          ))}
        </div>
      </WithSidebar>
    </Box>
  );
};

export default withApollo(Username);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  try {
    const res = await ssrGetUser.getServerPage(
      {
        variables: { username: params?.username as string },
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
