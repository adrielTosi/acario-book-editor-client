import { UserMedia } from "components/Profile/UserMedia";
import { H4Link } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Pill } from "components/ui/Pill";
import router from "next/router";
import styled from "styled-components";
import theme from "styles/theme";
import { ActionsBar } from "./ActionsBar";
import { StoryCardProps } from "./StoryCard";

export const VerticalFormat = (props: StoryCardProps) => {
  const publishedDate = new Date(
    parseInt(props.createdAt)
  ).toLocaleDateString();

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
            avatarSeed={props.author.avatarSeed}
            avatarType={props.author.avatarType}
            name={props.author.name}
            username={props.author.username}
            size="small"
          />
          <Box mt="8px" display="flex">
            {props.tags?.map(
              (tag) =>
                tag.tag?.label && (
                  <Box mr="2px" flexShrink={0} key={tag.tag?.value}>
                    <Pill text={tag.tag?.label} />
                  </Box>
                )
            )}
          </Box>
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
  margin-bottom: 8px;
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
`;
