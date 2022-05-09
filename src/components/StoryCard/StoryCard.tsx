import { UserMedia } from "components/Profile/UserMedia";
import { ChapterFragment } from "graphql/generated/graphqlTypes";
import { useAvatar } from "lib/hooks/useAvatar";
import router from "next/router";
import styled from "styled-components";
import theme from "styles/theme";
import { H4Link } from "../typography/Heading";
import { Text } from "../typography/Text";
import { Box } from "../ui/Box";
import { ActionsBar } from "./ActionsBar";

export type StoryCardProps = ChapterFragment;

export const StoryCard = (props: StoryCardProps) => {
  const publishedDate = new Date(
    parseInt(props.createdAt)
  ).toLocaleDateString();

  const avatar = useAvatar({
    seed: props.author.avatarSeed,
    type: props.author.avatarType,
  });
  return (
    <Wrapper>
      <TitleWrapper>
        <H4Link href={`/story/${props.id}`}>{props.title}</H4Link>
      </TitleWrapper>
      <DescriptionWrapper>
        <Description>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Text color={theme.colors.contrast_med} fontSize="14px">
              {props.description}
            </Text>
            <Box display="flex" justifyContent="space-between">
              <Text color={theme.colors.contrast_low} size="small">
                {publishedDate}
              </Text>
              <Text color={theme.colors.contrast_med} size="small">
                2.356 words
              </Text>
            </Box>
          </Box>
        </Description>

        <Details>
          <UserMedia
            avatar={avatar}
            name={props.author.name}
            username={props.author.username}
            size="small"
          />
        </Details>
      </DescriptionWrapper>
      <ActionsBar
        props={{ ...props }}
        onCommentClick={() =>
          router.push({ pathname: `/story/${props.id}`, hash: "comments" })
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TitleWrapper = styled.div`
  padding: 0.5em 1em;
  border-radius: 0.125em;
  margin-bottom: 8px;
  ${({ theme }) => `
    background-color: ${theme.colors.bg_comp_1_light}
  `}
`;

const DescriptionWrapper = styled.div`
  border-radius: 0.125em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  ${({ theme }) => `
    background-color: ${theme.colors.bg_comp_1_light}
  `};
`;

const Description = styled.div`
  padding: 0.75em 1em;
  height: 100%;
`;

const Details = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.colors.comp_outline}`};
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
