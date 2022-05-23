import { ActionButton } from "components/StoryCard/ActionsBar";
import { useState } from "react";
import styled from "styled-components";
import { HiDotsHorizontal } from "@react-icons/all-files/hi/HiDotsHorizontal";
import theme from "styles/theme";
import { Box } from "./Box";

export type DropdownMenuItem =
  | {
      text: string;
      label: string | React.ReactNode;
      icon?: React.ReactNode;
      onClick: () => void;
      type?: "item" | "divider";
    }
  | { type: "divider" };
export type DropdownMenuProps = {
  /**
   * Optional trigger button, if undefined will have three dots
   */
  trigger?: React.ReactNode;
  data: DropdownMenuItem[];
};

export const DropdownMenu = ({ trigger, data }: DropdownMenuProps) => {
  return (
    <div className={`dropdown is-right is-hoverable`}>
      <div className="dropdown-trigger">
        <TriggerButton
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {trigger ? (
            trigger
          ) : (
            <ActionButton>
              <HiDotsHorizontal style={{ color: theme.colors.contrast_med }} />
            </ActionButton>
          )}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </TriggerButton>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <Content className="dropdown-content">
          {data.map((item) => {
            if (item.type === "divider") {
              return <Divider className="dropdown-divider" />;
            } else {
              return (
                <ItemButton
                  key={item.text}
                  className="dropdown-item"
                  onClick={() => item.onClick()}
                >
                  <Box display="flex" alignItems="center">
                    {item.icon && <> {item.icon}&nbsp;</>} {item.label}
                  </Box>
                </ItemButton>
              );
            }
          })}
        </Content>
      </div>
    </div>
  );
};

const TriggerButton = styled.button`
  background-color: transparent;
  border: none;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.colors.bg_comp_1};
`;
const ItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.contrast_high};
  cursor: pointer;
  &&.is-active {
    background-color: ${(props) => props.theme.colors.accent_2_200};
  }
`;

const Divider = styled.div`
  background-color: ${(props) => props.theme.colors.comp_outline};
`;
