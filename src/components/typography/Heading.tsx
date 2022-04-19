import styled, { css } from "styled-components";
import { color, ColorProps } from "styled-system";

const commonCSS = css<ColorProps>`
  ${color}
  color: ${props => props.theme.colors.contrast_high};
  text-decoration: none;
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
`

// ------ h1 --------
const H1CSS = css`
  ${commonCSS}
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -2px; 
  `
export const H1Link = styled.a<ColorProps>`
  ${H1CSS}
  `
export const H1 = styled.h1<ColorProps>`
  ${H1CSS}
  `;

// ------ h2 --------
const H2CSS = css`
  ${commonCSS}
  font-size: 32px;
  line-height: 39px;
  letter-spacing: -2px;
  `
export const H2Link = styled.a<ColorProps>`
  ${H2CSS}
  `
export const H2 = styled.h2<ColorProps>`
  ${H2CSS}
  `;

// ------ h3 --------
const H3CSS = css`
  ${commonCSS}
  font-size: 28px;
  line-height: 35px;
  letter-spacing: -2px;
  `
export const H3Link = styled.a<ColorProps>`
  ${H3CSS}
  `
export const H3 = styled.h3<ColorProps>`
  ${H3CSS}
  `;

// ------ h4 --------
const H4CSS = css`
  ${commonCSS}
  font-size: 24px;
  line-height: 30px;
  `
export const H4Link = styled.a<ColorProps>`
  ${H4CSS}
  `
export const H4 = styled.h4<ColorProps>`
  ${H4CSS}
  `;

// ------ h5 --------
const H5CSS = css`
  ${commonCSS}
  font-size: 20px;
  line-height: 26px;
  `
export const H5Link = styled.a<ColorProps>`
  ${H5CSS}
  `
export const H5 = styled.h5<ColorProps>`
  ${H5CSS}
  `;

// ------ h6 --------
const H6CSS = css`
  ${commonCSS}
  font-size: 14px;
  line-height: 19px;
  `
export const H6Link = styled.a<ColorProps>`
  ${H6CSS}
  `
export const H6 = styled.h6<ColorProps>`
  ${H6CSS}
`;
