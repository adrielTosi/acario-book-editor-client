import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";

export interface ButtonProps extends SpaceProps {
  variant?: "primary" | "secondary" | "danger";
  pill?: boolean;
  round?: boolean;
  loading?: boolean;
  lined?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: ${(props) => (props.pill || props.round ? "999px" : "4px")};
  height: fit-content;
  cursor: pointer;
  padding: ${(props) => {
    if (!props.round) {
      return css`8px 24px`;
    }
  }};
  ${({ theme, variant, lined }) => {
    if (variant === "secondary") {
      if (lined) {
        return css`
          border: 1px solid ${theme.colors.accent_2_500};
          color: ${theme.colors.accent_2_500};
          background-color: transparent;
          &:hover {
            color: ${theme.colors.contrast_high};
            border: 1px solid ${theme.colors.accent_2_600};
            background-color: ${theme.colors.accent_2_bg_light};
          }
          &:disabled {
            background-color: lightgray;
            cursor: not-allowed;
          }
        `;
      }
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
    if (variant === "danger") {
      return css`
        background-color: ${theme.colors.danger};
        color: ${theme.colors.contrast_high};
        &:disabled {
          background-color: ${theme.colors.danger_bg};
          cursor: not-allowed;
        }
      `;
    }

    if (lined) {
      return css`
        border: 1px solid ${theme.colors.accent_1_500};
        color: ${theme.colors.accent_1_500};
        background-color: transparent;
        &:hover {
          color: ${theme.colors.contrast_high};
          border: 1px solid ${theme.colors.accent_1_600};
          background-color: ${theme.colors.accent_1_bg_light};
        }
        &:disabled {
          background-color: lightgray;
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
