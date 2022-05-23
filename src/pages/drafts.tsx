import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { withApollo } from "apollo/withApollo";
import { StoryCard } from "components/StoryCard/StoryCard";
import { H1 } from "components/typography/Heading";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { useCurrentUser, useGetDrafts } from "graphql/generated/page";
import { usePrivateRoute } from "lib/auth";
import router from "next/router";
import { toast } from "react-toastify";
import theme from "styles/theme";

const Drafts = () => {
  usePrivateRoute();
  const { data: userData } = useCurrentUser();
  const { data, fetchMore, error } = useGetDrafts(() => ({
    variables: { take: 2, offset: 0 },
  }));

  if (error) {
    toast(error.message, { toastId: error.name });
    return null;
  }

  const handleFetchMore = () => {
    fetchMore({
      variables: { take: 2, offset: data?.getDrafts.drafts.length },
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
          &nbsp; <H1>Drafts</H1>
        </Box>
      </Box>
      <Box mt="1em" className="columns is-multiline">
        {data?.getDrafts.drafts.map((draft) => (
          <div className="column is-6-tablet is-3-desktop" key={draft.id}>
            <StoryCard
              {...draft}
              format="vertical"
              showActions={{ delete: true, edit: true, publish: true }}
            />
          </div>
        ))}
      </Box>
      {data?.getDrafts.hasMore && (
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

export default withApollo(Drafts);
