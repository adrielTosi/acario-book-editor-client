import React from "react";
import styled, { css } from "styled-components";
import { color, ColorProps, typography, TypographyProps } from "styled-system";

export interface TextProps extends ColorProps, TypographyProps {
  children: React.ReactNode;
  size?: "large" | "regular" | "small";
  inline_block?: boolean;
}

const Comp = styled.p<TextProps>`
  ${color}
  font-family: ${(props) => props.theme.font.body};
  font-style: normal;
  font-weight: normal;
  ${(props) => (props.inline_block ? "display: inline-block;" : "")}
  ${(props) => {
    if (props.size === "large") {
      return css`
        font-size: 20px;
        line-height: 30px;
      `;
    }
    if (props.size === "small") {
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
  ${typography}
`;

export const Text = ({
  children,
  color,
  size: type = "regular",
  ...props
}: TextProps) => {
  return (
    <Comp {...props} color={color as any} size={type}>
      {children}
    </Comp>
  );
};
