import styled from "styled-components"
import theme from "styles/theme"
import { H4, H4Link } from "./typography/Heading"
import { Text } from "./typography/Text"

export interface StoryCardProps {
  title: string
  id: string
  description: string
  words?: number | string
  published: string
  tags?: string[]
}

export const StoryCard = ({ title, description, published, id }: StoryCardProps) => {
  const publishedDate = new Date(parseInt(published)).toLocaleDateString()
  return (
    <Wrapper>
      <TitleWrapper>
        <H4Link href={`/story/${id}`}>{title}</H4Link>
      </TitleWrapper>
      <DescriptionWrapper>
        <Description>
          <Text color={theme.colors.contrast_med} >
            {description}
          </Text>
        </Description>

        <Details>
          <Text color={theme.colors.contrast_med} size="small">2.356 words</Text>
          <Text color={theme.colors.contrast_low} size="small">{publishedDate}</Text>
        </Details>
      </DescriptionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TitleWrapper = styled.div`
  padding: 0.5em 1em;
  border-radius: 0.5em;
  margin-bottom: 8px;
  ${({ theme }) => `
    background-color: ${theme.colors.bg_comp_1_light}
  `}
`

const DescriptionWrapper = styled.div`
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  ${({ theme }) => `
    background-color: ${theme.colors.bg_comp_1_light}
  `};
`

const Description = styled.div`
  padding: 0.75em 1em;
  `

const Details = styled.div`
  border-top: ${props => `1px solid ${props.theme.colors.comp_outline}`};
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`