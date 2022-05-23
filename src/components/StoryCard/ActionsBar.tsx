import { ApolloCache, gql, useApolloClient } from "@apollo/client";
import { IconContext } from "@react-icons/all-files";
import { BiCommentAdd } from "@react-icons/all-files/bi/BiCommentAdd";
import { TiThumbsDown } from "@react-icons/all-files/ti/TiThumbsDown";
import { TiThumbsUp } from "@react-icons/all-files/ti/TiThumbsUp";
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
import { ChapterStatus } from "graphql/generated/graphqlTypes";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { MdArchive } from "@react-icons/all-files/md/MdArchive";
import { MdPublish } from "@react-icons/all-files/md/MdPublish";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import router from "next/router";
import { Api } from "lib/api";

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

type ActionBarMenuItems = DropdownMenuItem & {
  show?: boolean;
};

export const ActionsBar = ({ props, onCommentClick }: ActionsBarProps) => {
  const [reactToChapter] = useReactToChapterMutation();
  const [saveToLater] = useSaveToReadLaterMutation();
  const currentUser = useCurrentUser();
  const client = useApolloClient();

  const deleteChapter = Api().deleteChapter();
  const updateStatus = Api().updateStatus();

  // Read data from Apollo cache
  const cachedData = client.readFragment<{
    id: string;
    likes: number;
    dislikes: number;
    reactions: { authorId: string; value: number }[];
    status: ChapterStatus;
  }>({
    id: "Chapter:" + props?.id,
    fragment: gql`
      fragment __ on Chapter {
        id
        likes
        dislikes
        reactions
        status
      }
    `,
  });
  console.log(cachedData?.status, ChapterStatus.Published.toLowerCase());
  const userVote = useMemo(() => {
    if (cachedData?.reactions) {
      return {
        hasVoted:
          currentUser.data?.currentUser.id ===
          cachedData?.reactions[0]?.authorId,
        value: cachedData?.reactions[0]?.value,
      };
    }
    return {
      hasVoted: false,
    };
  }, [cachedData?.reactions, currentUser.data]);

  const MenuItems: ActionBarMenuItems[] = useMemo(() => {
    return [
      {
        label: "Read Later",
        icon: <AiOutlineSave />,
        text: "read later",
        show: props.showActions.readLater,
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
      {
        label: "Edit",
        text: "edit",
        icon: <FiEdit />,
        show: props.showActions.edit,
        onClick: () => {
          router.push(`/edit/${props.id}`);
        },
      },
      ...[
        cachedData?.status === ChapterStatus.Published.toLowerCase()
          ? {
              label: "Unpublish",
              text: "draft",
              icon: <MdArchive />,
              show: props.showActions.publish,
              onClick: () => updateStatus.run(ChapterStatus.Draft, props.id),
            }
          : {
              label: "Publish",
              text: "publish",
              icon: <MdPublish />,
              show: props.showActions.publish,
              onClick: () =>
                updateStatus.run(ChapterStatus.Published, props.id),
            },
      ],
      {
        type: "divider",
        show: props.showActions.delete,
      },
      {
        label: "Delete",
        text: "delete",
        icon: <RiDeleteBin5Fill />,
        show: props.showActions.delete,
        onClick: () => deleteChapter.run(props.id),
      },
    ];
  }, [cachedData?.status, props.showActions]);

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
        <ActionButton onClick={onCommentClick}>
          <BiCommentAdd style={{ color: theme.colors.contrast_med }} />
        </ActionButton>

        <ActionButton onClick={handleDownvote}>
          {userVote.value === -1 && (
            <LikeNumber value={-1}>{cachedData?.dislikes}</LikeNumber>
          )}
          <TiThumbsDown
            style={{
              color: handleColor(userVote.hasVoted && userVote.value === -1),
            }}
          />
        </ActionButton>
        <ActionButton onClick={handleUpvote}>
          {userVote.value === 1 && (
            <LikeNumber value={1}>{cachedData?.likes}</LikeNumber>
          )}
          <TiThumbsUp
            style={{
              color: handleColor(userVote.hasVoted && userVote.value === 1),
            }}
          />
        </ActionButton>
        {MenuItems.filter((item) => item.show).length > 0 && (
          <DropdownMenu data={MenuItems.filter((item) => item.show)} />
        )}
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
