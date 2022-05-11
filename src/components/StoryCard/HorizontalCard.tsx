import { UserMedia } from "components/Profile/UserMedia";
import { H4Link } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { useAvatar } from "lib/hooks/useAvatar";
import router from "next/router";
import styled from "styled-components";
import theme from "styles/theme";
import { ActionsBar } from "./ActionsBar";
import { StoryCardProps } from "./StoryCard";

export const HorizontalCard = (props: StoryCardProps) => {
  const avatar = useAvatar({
    seed: props.author.avatarSeed,
    type: props.author.avatarType,
  });
  const publishedDate = new Date(
    parseInt(props.createdAt)
  ).toLocaleDateString();

  return (
    <>
      <Wrapper>
        <Columns className="columns">
          <div className="column is-9">
            <Box p="0.5em 1em">
              <H4Link href={`/story/${props.id}`}>{props.title}</H4Link>
              <Box mt="0.5em">
                <Text color={theme.colors.contrast_med} fontSize="14px">
                  {props.description}
                </Text>
              </Box>
            </Box>
          </div>
          <Bordered className="column">
            <Box p="0.5em 0.5em">
              <UserMedia
                avatar={avatar}
                name={props.author.name}
                username={props.author.username}
                size="small"
              />
              <Box
                display="flex"
                justifyContent="space-between"
                mt="8px"
                flexWrap="wrap"
              >
                <Text color={theme.colors.contrast_med} size="small">
                  2.356 words
                </Text>
                <Text color={theme.colors.contrast_low} size="small">
                  {publishedDate}
                </Text>
              </Box>
            </Box>
          </Bordered>
        </Columns>
      </Wrapper>
      <Box mb="1em">
        <ActionsBar
          props={{ ...props }}
          onCommentClick={() =>
            router.push({ pathname: `/story/${props.id}`, hash: "comments" })
          }
        />
      </Box>
    </>
  );
};

const Wrapper = styled.div`
  border-radius: 0.125em;
  ${({ theme }) => `
    background-color: ${theme.colors.bg_comp_1_light}
  `}
`;

const Bordered = styled.div`
  border-left: ${(props) => `1px solid ${props.theme.colors.comp_outline}`};
  padding: 0.5em;
`;

const Columns = styled.div`
  && {
    margin: 0;
  }
`;
