import styled, { css } from "styled-components";

export const Sidebar = () => {
  return <Wrapper></Wrapper>;
};
const Wrapper = styled.div`
  ${(props) => {
    return css`
      @media ${props.theme.device.tablet} {
        border-right: ${(props) =>
          `1px solid ${props.theme.colors.comp_outline}`};
        position: sticky;
        height: 100%;
        top: 0;
        bottom: 0;
      }
    `;
  }}
`;
