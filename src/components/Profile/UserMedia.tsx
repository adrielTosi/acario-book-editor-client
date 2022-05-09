import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import Link from "next/link";
import styled, { css } from "styled-components";

export type UserProps = {
  avatar: string;
  username: string;
  name: string;
  size?: "small" | "regular";
};

export const UserMedia = ({
  avatar,
  username,
  name,
  size = "regular",
}: UserProps) => {
  const imageSize = size == "regular" ? "is-64x64" : "is-32x32";
  const usernameToDisplay = `@${username}`;
  return (
    <Wrapper>
      <Box mr="0.5em">
        <figure className={`image ${imageSize}`}>
          <div dangerouslySetInnerHTML={{ __html: avatar }} />
        </figure>
      </Box>
      <div>
        <Text size={size}>{name}</Text>
        <Username size={size}>
          <Link href={`/user/${username}`}>{usernameToDisplay}</Link>
        </Username>
      </div>
    </Wrapper>
  );
};

const Username = styled(Text)`
  a {
    ${(props) => css`
      color: ${props.theme.colors.contrast_med};
      text-decoration: none;
    `}
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
