import { withApollo } from "apollo/withApollo"
import { H1 } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { GetChapterQuery } from "graphql/generated/graphqlTypes";
import { ssrGetChapter } from "graphql/generated/page";
import { GetServerSideProps, NextPage } from "next";
import theme from "styles/theme";
import { ServerSideProps } from "types/ServerSideProps";

type StoryProps = ServerSideProps<GetChapterQuery>

const Story: NextPage<StoryProps> = ({ error, data }) => {
  if (error) {
    return (
      <div className="container has-text-centered">{error}</div>
    )
  }
  return (
    <div className="container is-max-desktop">
      <Box marginBottom="1em">
        <H1>{data.getChapter.title}</H1>
      </Box>
      <Box marginBottom="1em">
        <Text>{data.getChapter.description}</Text>
      </Box>

      <Box backgroundColor={theme.colors.bg_comp_1_light} padding="2em 1em" borderRadius="8px">
        {data.getChapter.text}
      </Box>
    </div>
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
