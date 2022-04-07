import styled from "styled-components"
import theme from "styles/theme"
import { H4 } from "./typography/Heading"
import { Text } from "./typography/Text"

export interface IStoryCard {
  title?: string
  description?: string
  words?: number | string
  published?: string
  tags?: string[]
}

export const StoryCard = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <H4> Lorem ipsum dolor sit amet consectetur adipisicing elit. </H4>
      </TitleWrapper>
      <DescriptionWrapper>
        <Description>
          <Text color={theme.colors.contrast_med} >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat numquam optio, harum facilis et suscipit nemo voluptates culpa voluptas nostrum laborum perferendis unde est iste fugiat accusantium nulla facere dicta!
          </Text>
        </Description>

        <Details>
          <Text color={theme.colors.contrast_med} size="small">2.356 words</Text>
          <Text color={theme.colors.contrast_low} size="small">17 July 2021</Text>
        </Details>
      </DescriptionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%
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
  ${({ theme }) => `
    background-color: ${theme.colors.bg_comp_1_light}
  `}
`

const Description = styled.div`
  padding: 0.75em 1em;
  border-bottom: ${props => `1px solid ${props.theme.colors.comp_outline}`}
`

const Details = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`