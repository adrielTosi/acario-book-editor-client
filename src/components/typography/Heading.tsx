import React from "react";
import styled from "styled-components";
import { color, ColorProps } from "styled-system";

export const H1 = styled.h1<ColorProps>`
  ${color}
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: -2px;
`;

export const H2 = styled.h2<ColorProps>`
  ${color}
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: -2px;
`;

export const H3 = styled.h3<ColorProps>`
  ${color}
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: -2px;
`;

export const H4 = styled.h4<ColorProps>`
  ${color}
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
`;

export const H5 = styled.h5<ColorProps>`
  ${color}
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
`;

export const H6 = styled.h6<ColorProps>`
  ${color}
  font-family: ${(props) => props.theme.font.heading};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
`;
