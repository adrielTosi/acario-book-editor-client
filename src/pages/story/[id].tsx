import { withApollo } from "apollo/withApollo";
import { TextEditor } from "components/TextEditor/Editor";
import { H1 } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { GetChapterQuery } from "graphql/generated/graphqlTypes";
import { ssrGetChapter, useCurrentUser } from "graphql/generated/page";
import { useTipTap } from "lib/hooks/UseTipTap";
import { GetServerSideProps, NextPage } from "next";
import { ServerSideProps } from "types/ServerSideProps";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "components/ui/Button";
import { toast } from "react-toastify";
import { useDeleteChapterMutation } from "graphql/generated/mutations";
import router from "next/router";

type StoryProps = ServerSideProps<GetChapterQuery>;

const Story: NextPage<StoryProps> = ({ error, data }) => {
  if (error) {
    toast(error, { toastId: "error-on-edit-story" });
    return null;
  } else {
    const { data: user } = useCurrentUser();
    const [deleteChapter] = useDeleteChapterMutation();
    const editor = useTipTap({ content: data.getChapter.text, readOnly: true });
    const isOwner = user?.currentUser.id === data.getChapter.authorId;

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

    return (
      <Box className="container is-max-desktop" padding="0 8px">
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
        <Box marginBottom="1em" className="columns">
          <H1>{data.getChapter.title}</H1>
        </Box>
        <Box marginBottom="1em">
          <Text>{data.getChapter.description}</Text>
        </Box>

        <TextEditor editor={editor} readOnly={true} />
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
      },
      context
    );
    return res;
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};
