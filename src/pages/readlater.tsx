import { withApollo } from "apollo/withApollo";
import { H1 } from "components/typography/Heading";
import { Box } from "components/ui/Box";
import { ssrGetAllReadLater, useGetAllReadLater } from "graphql/generated/page";
import { usePrivateRoute } from "lib/auth";
import { GetServerSideProps, NextPage } from "next";
import theme from "styles/theme";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { Button } from "components/ui/Button";
import router from "next/router";
import { ServerSideProps } from "types/ServerSideProps";
import { GetAllReadLaterQuery } from "graphql/generated/graphqlTypes";
import { toast } from "react-toastify";
import { StoryCard } from "components/StoryCard/StoryCard";

const ReadLater: NextPage = () => {
  usePrivateRoute();
  const { data, error, fetchMore } = useGetAllReadLater(() => ({
    variables: { take: 2, offset: 0 },
  }));

  if (error) {
    toast(error.message, { toastId: error.name });
    return null;
  }

  const handleFetchMore = () => {
    fetchMore({
      variables: { take: 2, offset: data?.getAllSavedChapter.readLater.length },
    });
  };

  return (
    <div className="container">
      <Box pb="1em" borderBottom={`1px solid ${theme.colors.comp_outline}`}>
        <Button
          lined
          p="4px"
          variant="ghost"
          round
          onClick={() => router.back()}
        >
          <FaChevronLeft /> &nbsp;Back
        </Button>
        <Box mt="8px">
          &nbsp; <H1>Read Later</H1>
        </Box>
      </Box>
      <Box mt="1em" className="columns is-multiline">
        {data?.getAllSavedChapter.readLater.map((readLater) => (
          <div
            className="column is-6-tablet is-3-desktop"
            key={readLater.chapter.id}
          >
            <StoryCard {...readLater.chapter} format="vertical" />
          </div>
        ))}
      </Box>
      {data?.getAllSavedChapter.hasMore && (
        <Box
          textAlign="center"
          borderTop={`1px solid ${theme.colors.comp_outline}`}
          pt="1em"
        >
          <Button onClick={handleFetchMore} lined>
            More...
          </Button>
        </Box>
      )}
    </div>
  );
};

export default withApollo(ReadLater);
