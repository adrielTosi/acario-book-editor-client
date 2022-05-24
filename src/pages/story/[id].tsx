import { gql, useApolloClient } from "@apollo/client";
import { withApollo } from "apollo/withApollo";
import { Comment } from "components/Comment/Comment";
import { ActionsBar } from "components/StoryCard/ActionsBar";
import { TextEditor } from "components/TextEditor/Editor";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { PageTitle } from "components/ui/PageTitle";
import { Pill } from "components/ui/Pill";
import { StyledField } from "components/ui/StyledField";
import {
  CommentFragment,
  GetChapterQuery,
} from "graphql/generated/graphqlTypes";
import {
  ChapterStatus,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "graphql/generated/mutations";
import { ssrGetChapter, useCurrentUser } from "graphql/generated/page";
import { useTipTap } from "lib/hooks/UseTipTap";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import theme from "styles/theme";
import { ServerSideProps } from "types/ServerSideProps";

type StoryProps = ServerSideProps<GetChapterQuery>;

const Story: NextPage<StoryProps> = ({ error, data }) => {
  if (error) {
    toast(error, { toastId: "error-on-view-story" });
    return null;
  } else {
    const client = useApolloClient();
    const editor = useTipTap({ content: data.getChapter.text, readOnly: true });

    const { data: user } = useCurrentUser();
    const [comment] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [editComment] = useEditCommentMutation();

    const [commentInput, setComment] = useState("");
    const [isCommenting, toggleCommenting] = useState(false);
    const [isEditing, toggleEditing] = useState(false);
    const isOwner = user?.currentUser.id === data.getChapter.authorId;

    // LIVE CACHEDD COMMENTS DATA
    const cacheData = client.readFragment<{
      comments: CommentFragment[];
      status: ChapterStatus;
    }>({
      id: "Chapter:" + data.getChapter.id,
      fragment: gql`
        fragment ____ on Chapter {
          status
          comments {
            id
            text
            author {
              id
              username
              name
              avatarType
              avatarSeed
            }
            chapterId
            createdAt
            updatedAt
          }
        }
      `,
    });

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setComment(e.target.value);
    };

    const handleAddComment = async () => {
      try {
        await comment({
          variables: {
            data: { text: commentInput, chapterId: data.getChapter.id },
          },
          update(cache, { data: newCommentData }) {
            cache.modify({
              id: "Chapter:" + data.getChapter.id,
              fields: {
                comments(cachedComments = []) {
                  const newComment = cache.writeFragment({
                    data: newCommentData?.createComment,
                    fragment: gql`
                      fragment NewComment on Comment {
                        id
                        text
                        author {
                          id
                          username
                          name
                          avatarType
                          avatarSeed
                        }
                        chapterId
                        createdAt
                        updatedAt
                      }
                    `,
                  });
                  return [newComment, ...cachedComments];
                },
              },
            });
          },
        });

        toggleCommenting(false);
      } catch (err: any) {
        toast(err.message, {
          toastId: "comment-error",
        });
      }
    };

    const handleDeleteComment = async (id: string) => {
      try {
        const sure = confirm("Are you sure?");
        if (sure) {
          await deleteComment({
            variables: { id },
            update(cache) {
              const normalizedId = cache.identify({
                id,
                __typename: "Comment",
              });
              cache.evict({ id: normalizedId });
              cache.gc();
            },
          });
        }
      } catch (err: any) {
        toast(err.message, {
          toastId: data.getChapter.dislikes,
        });
      }
    };

    const handleEditComment = async (id: string, text: string) => {
      try {
        await editComment({
          variables: { id, text },
          update(cache) {
            cache.modify({
              id: "Comment:" + id,
              fields: {
                text() {
                  return text;
                },
              },
            });
          },
        });
        toggleEditing(false);
      } catch (err: any) {
        toast(err.message, {
          toastId: id,
        });
      }
    };

    return (
      <Box className="container is-max-desktop" padding="0 8px">
        {/* TITLE */}
        <PageTitle text={data.getChapter.title} />
        <Box marginBottom="2em" mt="1em" color={theme.colors.contrast_med}>
          <Text>{data.getChapter.description}</Text>
        </Box>

        {/* TEXT */}

        {/* <Box position="relative">
          <ExpandButton />
        </Box> */}
        <TextEditor editor={editor} readOnly={true} />

        {/* INTERACTIONS */}
        <Box
          padding="1em 0"
          borderBottom={`1px solid ${theme.colors.bg_comp_1_light}`}
        >
          <ActionsBar
            props={{
              ...data.getChapter,
              showActions: {
                readLater: user?.currentUser.id !== data.getChapter.authorId,
                publish: true,
                delete: true,
                edit: true,
              },
            }}
            onCommentClick={() => toggleCommenting((prev) => !prev)}
          />
        </Box>

        {/* ADD COMMENTS */}
        {isCommenting && (
          <Box mt="1em">
            <StyledField
              as="textarea"
              value={commentInput}
              onChange={handleChange}
            />
            <Box textAlign="end">
              <Button
                padding="4px 6px"
                variant="primary"
                mt="8px"
                onClick={handleAddComment}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}

        {/* COMMENTS */}
        <Box mt="1em" id="comments">
          {cacheData?.comments?.map((comment) => (
            <Box mb="1em" key={comment.id}>
              <Comment
                data={{ ...comment }}
                owner={user?.currentUser.id}
                handleDelete={handleDeleteComment}
                toggleEditing={() => toggleEditing((prev) => !prev)}
                isEditing={isEditing}
                handleEdit={handleEditComment}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
};

const EditButton = styled(Link)`
  background-color: ${(props) => props.theme.colors.accent_1_200};
  padding: 8px;
  border-radius: 50px;
`;

export default withApollo(Story);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  try {
    const res = await ssrGetChapter.getServerPage(
      {
        variables: { chapterId: params ? (params.id as string) : "" },
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
