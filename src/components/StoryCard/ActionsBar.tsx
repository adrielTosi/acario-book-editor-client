import styled from "styled-components";
import { TiThumbsUp } from "@react-icons/all-files/ti/TiThumbsUp";
import { TiThumbsDown } from "@react-icons/all-files/ti/TiThumbsDown";
import { IconContext } from "@react-icons/all-files";
import theme from "styles/theme";
import { StoryCardProps } from "./StoryCard";
import {
  ReactToChapterMutation,
  useReactToChapterMutation,
} from "graphql/generated/mutations";
import { useCurrentUser } from "graphql/generated/page";
import { ApolloCache, gql, useApolloClient } from "@apollo/client";
import { toast } from "react-toastify";
import { useMemo } from "react";

const updateCache = (
  cache: ApolloCache<ReactToChapterMutation>,
  id?: string,
  likes?: number,
  dislikes?: number,
  reactions?: any // too complicated
) => {
  cache.writeFragment({
    id: "Chapter:" + id,
    fragment: gql`
      fragment UpdatedChapter on Chapter {
        likes
        dislikes
        reactions
      }
    `,
    data: {
      likes: likes,
      dislikes: dislikes,
      reactions: reactions,
    },
  });
};

export const ActionsBar = (props: StoryCardProps) => {
  const [reactToChapter] = useReactToChapterMutation();
  const currentUser = useCurrentUser();
  const client = useApolloClient();

  const data = client.readFragment<{
    id: string;
    likes: number;
    dislikes: number;
    reactions: { authorId: string; value: number }[];
  }>({
    id: "Chapter:" + props.id,
    fragment: gql`
      fragment __ on Chapter {
        id
        likes
        dislikes
        reactions
      }
    `,
  });

  const userVote = useMemo(() => {
    if (data?.reactions) {
      return {
        hasVoted:
          currentUser.data?.currentUser.id === data?.reactions[0]?.authorId,
        value: data?.reactions[0]?.value,
      };
    }
    return {
      hasVoted: false,
    };
  }, [data?.reactions, currentUser.data]);
  // console.log(props);
  const handleUpvote = async () => {
    try {
      await reactToChapter({
        variables: { id: props.id, value: 1 },
        update(cache, { data }) {
          const chapter = data?.reactToChapter.chapter;
          updateCache(
            cache,
            chapter?.id,
            chapter?.likes,
            chapter?.dislikes,
            chapter?.reactions
          );
        },
      });
    } catch (err: any) {
      toast(`Something went wrong: ${err.message}`, {
        toastId: "error upvote",
      });
    }
  };

  const handleDownvote = async () => {
    try {
      await reactToChapter({
        variables: { id: props.id, value: -1 },
        update(cache, { data }) {
          const chapter = data?.reactToChapter.chapter;
          updateCache(
            cache,
            chapter?.id,
            chapter?.likes,
            chapter?.dislikes,
            chapter?.reactions
          );
        },
      });
    } catch (err: any) {
      toast(`Something went wrong: ${err.message}`, {
        toastId: "error downvote",
      });
    }
  };

  const handleColor = (voted: boolean) => {
    if (voted) {
      return theme.colors.accent_2_500;
    }
    return theme.colors.contrast_med;
  };

  return (
    <IconContext.Provider value={{ size: "24px" }}>
      <Wrapper>
        <div>dislikes: {data?.dislikes}--</div>
        <div>likes: {data?.likes}</div>
        <AButton onClick={handleDownvote}>
          <TiThumbsDown
            style={{
              color: handleColor(userVote.hasVoted && userVote.value === -1),
            }}
          />
        </AButton>
        <AButton onClick={handleUpvote}>
          <TiThumbsUp
            style={{
              color: handleColor(userVote.hasVoted && userVote.value === 1),
            }}
          />
        </AButton>
      </Wrapper>
    </IconContext.Provider>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const AButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.accent_2_bg_light};
  }
`;
