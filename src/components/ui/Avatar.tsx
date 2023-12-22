import { useAvatar, UseAvatarProps } from "lib/hooks/useAvatar";
import styled, { css } from "styled-components";

export type AvatarProps = UseAvatarProps & {
  size?: "is-64x64" | "is-32x32";
};

export const Avatar = ({ seed, type, size = "is-64x64" }: AvatarProps) => {
  const svg = useAvatar({
    seed,
    type,
  });

  return (
    <Figure className={`image ${size}`}>
      <div
        dangerouslySetInnerHTML={{ __html: svg }}
        className={`image ${size}`}
      />
    </Figure>
  );
};

const Figure = styled.figure({
  backgroundColor: "white",
  borderRadius: "100%",
});

// const AvatarWrapper = styled.div<AvatarProps>`
//   ${(props) => {
//     if (props.size === "is-64x64") {
//       return css`
//         height: "64px"
//         width: "64px"
//       `;
//     } else {
//       return css`
//         height: "32px"
//         width: "32px"
//       `;
//     }
//   }}
// `;
