import { withApollo } from "apollo/withApollo";
import { Box } from "components/ui/Box";
import { ssrGetChaptersFromUser } from "graphql/generated/page";
import { GetServerSideProps, NextPage } from "next";

type UsernameProps = Awaited<ReturnType<typeof ssrGetChaptersFromUser.getServerPage>>["props"]

const Username: NextPage<UsernameProps> = (props) => {
  // const { data: chapterData, error } = ssrGetChaptersFromUser.usePage((router) => ({
  //   variables: { username: router.query.username as string },
  // }));
  if (props.error) {
    return <div>{props.error}</div>
  }
  return (
    <div className="columns is-centered">
      <div className="column is-3"></div>
      <div className="column is-9">
        {props.data.getChaptersFromUser.map((chapter: any) => {
          return (
            <Box mb="12px" key={chapter.id}>
              <div>
                <div>Title: {chapter.title}</div>
                <div>Likes: {chapter.likes}</div>
                <div>Dislikes: {chapter.dislikes}</div>
              </div>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default withApollo(Username);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  try {
    const res = await ssrGetChaptersFromUser.getServerPage(
      {
        variables: { username: params ? (params.username as string) : "" },
        notifyOnNetworkStatusChange: true,
      },
      context
    );
    return res;
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};
