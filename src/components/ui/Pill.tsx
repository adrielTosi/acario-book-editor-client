import styled from "styled-components";
import { color, ColorProps } from "styled-system";

type PillProps = ColorProps & {
  text: string;
};

export const Pill = ({ text }: PillProps) => {
  return <Wrapper>{text}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 4px 8px;
  display: inline-block;
  border-radius: 999px;
  font-size: 12px;
  background-color: ${(props) => props.theme.colors.comp_outline};
  color: ${(props) => props.theme.colors.contrast_high} ${color};
`;
