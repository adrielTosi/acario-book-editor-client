import { useState } from "react";
import styled from "styled-components";

export type DropdownMenuItem = {
  text: string;
  label: string | React.ReactNode;
  onClick: () => void;
};
export type DropdownMenuProps = {
  trigger: React.ReactNode;
  data: DropdownMenuItem[];
};

export const DropdownMenu = ({ trigger, data }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`dropdown is-right ${isOpen ? "is-active" : ""}`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="dropdown-trigger">
        <TriggerButton
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {trigger}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </TriggerButton>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <Content className="dropdown-content">
          {data.map((item) => (
            <ItemButton
              key={item.text}
              className="dropdown-item"
              onClick={() => item.onClick()}
            >
              {item.label}
            </ItemButton>
          ))}
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
