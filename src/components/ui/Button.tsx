import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";

export interface ButtonProps extends SpaceProps {
  variant?: "primary" | "secondary";
  pill?: boolean;
  loading?: boolean
}

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: ${(props) => (props.pill ? "999px" : "4px")};
  padding: 8px 24px;
  cursor: pointer;
  ${({ theme, variant }) => {
    if (variant === "secondary") {
      return css`
        background-color: ${theme.colors.accent_2_500};
        color: ${theme.colors.contrast_high};
        &:hover {
          background-color: ${theme.colors.accent_2_600};
        }
        &:disabled {
          background-color: ${theme.colors.accent_2_200};
          cursor: not-allowed;
        }
      `;
    }

    return css`
      background-color: ${theme.colors.accent_1_500};
      color: ${theme.colors.bg_comp_1};
      &:hover {
        background-color: ${theme.colors.accent_1_600};
      }
      &:disabled {
        background-color: ${theme.colors.accent_1_200};
        cursor: not-allowed;
        color: ${theme.colors.contrast_low};
      }
    `;
  }}
  ${space}
`;
