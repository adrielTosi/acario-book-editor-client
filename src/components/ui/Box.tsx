import styled from "styled-components";
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps,
    BackgroundProps,
    BorderProps,
    PositionProps {}

export const Box = styled.div<BoxProps>`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${background}
  ${border}
  ${position}
`;
