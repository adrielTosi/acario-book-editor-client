import { H1 } from "components/typography/Heading";
import { ColorProps } from "styled-system";
import theme from "styles/theme";
import { Box } from "./Box";

export type PageTitleProps = ColorProps & {
  text: string;
  color?: string;
};

export const PageTitle = ({ text, color, ...colorProps }: PageTitleProps) => {
  return (
    <Box
      pb="1em"
      borderBottom={`1px solid ${theme.colors.comp_outline}`}
      {...colorProps}
    >
      <H1 color={color}>{text}</H1>
    </Box>
  );
};
