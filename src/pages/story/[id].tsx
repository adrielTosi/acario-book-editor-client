import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { withApollo } from "apollo/withApollo"
import { TextEditor } from "components/TextEditor/Editor";
import { H1 } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { GetChapterQuery } from "graphql/generated/graphqlTypes";
import { ssrGetChapter } from "graphql/generated/page";
import { useTipTap } from "lib/hooks/UseTipTap";
import { GetServerSideProps, NextPage } from "next";
import { ServerSideProps } from "types/ServerSideProps";

type StoryProps = ServerSideProps<GetChapterQuery>

const Story: NextPage<StoryProps> = ({ error, data }) => {
  const editor = useTipTap({ content: data.getChapter.text, readOnly: true })

  if (error) {
    return (
      <div className="container has-text-centered">{error}</div>
    )
  }
  return (
    <Box className="container is-max-desktop" padding="0 8px">
      <Box marginBottom="1em">
        <H1>{data.getChapter.title}</H1>
      </Box>
      <Box marginBottom="1em">
        <Text>{data.getChapter.description}</Text>
      </Box>


      <TextEditor editor={editor} readOnly />

    </Box>
  )
}

export default withApollo(Story)

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
