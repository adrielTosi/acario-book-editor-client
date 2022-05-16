import { ApolloCache, gql, useApolloClient } from "@apollo/client";
import { IconContext } from "@react-icons/all-files";
import { BiCommentAdd } from "@react-icons/all-files/bi/BiCommentAdd";
import { TiThumbsDown } from "@react-icons/all-files/ti/TiThumbsDown";
import { TiThumbsUp } from "@react-icons/all-files/ti/TiThumbsUp";
import { HiDotsHorizontal } from "@react-icons/all-files/hi/HiDotsHorizontal";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import {
  ReactToChapterMutation,
  useReactToChapterMutation,
  useSaveToReadLaterMutation,
} from "graphql/generated/mutations";
import { useCurrentUser } from "graphql/generated/page";
import { useMemo } from "react";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import theme from "styles/theme";
import { StoryCardProps } from "./StoryCard";
import { DropdownMenu, DropdownMenuItem } from "components/ui/DropdownMenu";
import { Box } from "components/ui/Box";

const updateCache = (
  cache: ApolloCache<ReactToChapterMutation>,
  id?: string,
  likes?: number,
  dislikes?: number,
  reactions?: any // too complicated
) => {
  cache.modify({
    id: "Chapter:" + id,
    fields: {
      likes() {
        return likes;
      },
      dislikes() {
        return dislikes;
      },
      reactions() {
        return reactions;
      },
    },
  });
};

type ActionsBarProps = {
  props: Omit<StoryCardProps, "format">;
  onCommentClick?: () => void;
};

export const ActionsBar = ({ props, onCommentClick }: ActionsBarProps) => {
  const [reactToChapter] = useReactToChapterMutation();
  const [saveToLater] = useSaveToReadLaterMutation();
  const currentUser = useCurrentUser();
  const client = useApolloClient();

  // Read data from Apollo cache
  const data = client.readFragment<{
    id: string;
    likes: number;
    dislikes: number;
    reactions: { authorId: string; value: number }[];
  }>({
    id: "Chapter:" + props?.id,
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

  const MenuItems: DropdownMenuItem[] = [
    {
      label: (
        <Box display="flex" alignItems="center">
          <AiOutlineSave />
          &nbsp; Read later
        </Box>
      ),
      text: "read later",
      onClick: async () => {
        try {
          await saveToLater({ variables: { id: props.id } });
          toast(
            <span>
              Added <strong>{props.title}</strong> to read later.
            </span>,
            {
              toastId: props.title,
            }
          );
        } catch (err: any) {
          toast(err.message, {
            toastId: props.title,
          });
        }
      },
    },
  ];

  return (
    <IconContext.Provider value={{ size: "24px" }}>
      <Wrapper>
        <ActionButton onClick={onCommentClick}>
          <BiCommentAdd style={{ color: theme.colors.contrast_med }} />
        </ActionButton>

        <ActionButton onClick={handleDownvote}>
          {userVote.value === -1 && (
            <LikeNumber value={-1}>{data?.dislikes}</LikeNumber>
          )}
          <TiThumbsDown
            style={{
              color: handleColor(userVote.hasVoted && userVote.value === -1),
            }}
          />
        </ActionButton>
        <ActionButton onClick={handleUpvote}>
          {userVote.value === 1 && (
            <LikeNumber value={1}>{data?.likes}</LikeNumber>
          )}
          <TiThumbsUp
            style={{
              color: handleColor(userVote.hasVoted && userVote.value === 1),
            }}
          />
        </ActionButton>
        <DropdownMenu
          data={MenuItems}
          trigger={
            <ActionButton>
              <HiDotsHorizontal style={{ color: theme.colors.contrast_med }} />
            </ActionButton>
          }
        />
      </Wrapper>
    </IconContext.Provider>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AButtonStyles = css`
  background-color: transparent;
  position: relative;
  cursor: pointer;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.accent_2_bg_light};
  }
`;
export const ActionButton = styled.button`
  ${AButtonStyles}
`;

const LikeNumber = styled.div<{ value: number }>`
  position: absolute;
  height: 100%;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${(props) =>
    `linear-gradient(0deg, ${props.theme.colors.bg_primary} 0%, rgba(255,255,255,0) 100%)`};

  color: ${(props) => {
    if (props.value === -1) {
      return props.theme.colors.accent_2_500;
    }
    return props.theme.colors.accent_1_500;
  }};
`;
