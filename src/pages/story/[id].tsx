import { gql, useApolloClient } from "@apollo/client";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import { withApollo } from "apollo/withApollo";
import { Comment } from "components/Comment/Comment";
import { ActionsBar } from "components/StoryCard/ActionsBar";
import { TextEditor } from "components/TextEditor/Editor";
import { H1 } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { StyledField } from "components/ui/StyledField";
import {
  CommentFragment,
  GetChapterQuery,
} from "graphql/generated/graphqlTypes";
import {
  useCreateCommentMutation,
  useDeleteChapterMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "graphql/generated/mutations";
import { ssrGetChapter, useCurrentUser } from "graphql/generated/page";
import { useTipTap } from "lib/hooks/UseTipTap";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
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
    const router = useRouter();
    const editor = useTipTap({ content: data.getChapter.text, readOnly: true });

    const { data: user } = useCurrentUser();
    const [deleteChapter] = useDeleteChapterMutation();
    const [comment] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [editComment] = useEditCommentMutation();

    const [commentInput, setComment] = useState("");
    const [isCommenting, toggleCommenting] = useState(false);
    const [isEditing, toggleEditing] = useState(false);
    const isOwner = user?.currentUser.id === data.getChapter.authorId;

    // LIVE CACHEDD COMMENTS DATA
    const commentsData = client.readFragment<{ comments: CommentFragment[] }>({
      id: "Chapter:" + data.getChapter.id,
      fragment: gql`
        fragment Comments on Chapter {
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

    const handleDeleteChapter = async () => {
      const sure = confirm(
        "Are you sure you want to delete this story? This is irreversible."
      );
      if (sure) {
        try {
          await deleteChapter({ variables: { chapterId: data.getChapter.id } });
          router.push("/dashboard");
          toast("Story deleted.", {
            toastId: data.getChapter.id,
          });
        } catch (err) {
          toast((err as any).message, {
            toastId: data.getChapter.id,
          });
        }
      }
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
        {/* OWNER ACTIONS */}
        {isOwner && (
          <Box textAlign="right" mt="1em" mb="1em">
            <EditButton href={`/edit/${data.getChapter.id}`}>
              <Button pill p="4px 8px">
                <Box display="flex" alignItems="center">
                  <Box mr="4px">Edit</Box> <FiEdit />
                </Box>
              </Button>
            </EditButton>
            <Button
              pill
              p="4px 8px"
              ml="4px"
              variant="danger"
              onClick={handleDeleteChapter}
            >
              <Box display="flex" alignItems="center">
                <Box mr="4px">Delete</Box> <RiDeleteBin5Fill />
              </Box>
            </Button>
          </Box>
        )}

        {/* TITLE */}
        <Box marginBottom="1em" className="columns">
          <H1>{data.getChapter.title}</H1>
        </Box>
        <Box marginBottom="1em">
          <Text>{data.getChapter.description}</Text>
        </Box>

        {/* TEXT */}
        <TextEditor editor={editor} readOnly={true} />

        {/* INTERACTIONS */}
        <Box
          padding="1em 0"
          borderBottom={`1px solid ${theme.colors.bg_comp_1_light}`}
        >
          <ActionsBar
            props={{ ...data.getChapter }}
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
          {commentsData?.comments?.map((comment) => (
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
