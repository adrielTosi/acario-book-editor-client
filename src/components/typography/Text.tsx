import React from "react";
import styled, { css } from "styled-components";
import { color, ColorProps } from "styled-system";

export interface TextProps extends ColorProps {
  children: React.ReactNode;
  type?: "large" | "regular" | "small";
}

const Comp = styled.p<TextProps>`
  ${color}
  font-family: ${(props) => props.theme.font.body};
  font-style: normal;
  font-weight: normal;
  ${(props) => {
    if (props.type === "large") {
      return css`
        font-size: 20px;
        line-height: 30px;
      `;
    }
    if (props.type === "small") {
      return css`
        font-size: 12px;
        line-height: 18px;
      `;
    }
    return css`
      font-size: 16px;
      line-height: 24px;
    `;
  }}
`;

export const Text = ({ children, color, type = "regular", ...props }: TextProps) => {
  return (
    <Comp {...props} color={color as any} type={type}>
      {children}
    </Comp>
  );
};
