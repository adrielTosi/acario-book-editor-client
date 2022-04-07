import React from "react";
import Link from "next/link";
import { StoryCard } from "components/StoryCard";
import { withApollo } from "apollo/withApollo";
import { GetServerSideProps, NextPage } from "next";
import { ssrGetChaptersFromUser } from "graphql/generated/page";
import { GetChaptersFromUserQuery } from "graphql/generated/graphqlTypes";
import { ServerSideProps } from "types/ServerSideProps";

type HomeProps = ServerSideProps<GetChaptersFromUserQuery>

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className="container">
      <div className="columns is-multiline is-full-height">
        {props.data.getChaptersFromUser.map(chapter =>
          <div className="column is-3">
            <StoryCard title={chapter.title} description={chapter.description} published={chapter.createdAt} key={chapter.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withApollo(Home)


export const getServerSideProps: GetServerSideProps = async (context) => {
  // const params = context.params;

  try {
    const res = await ssrGetChaptersFromUser.getServerPage(
      {
        variables: { username: "acario" },
        notifyOnNetworkStatusChange: true,
      },
      context
    );
    return res;
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};