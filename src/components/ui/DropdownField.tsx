import { useState } from "react";
import styled from "styled-components";
import { AppFieldStyles } from "./StyledField";
import { HiChevronDown } from "@react-icons/all-files/hi/HiChevronDown";

export type DropdownFieldItem = {
  text: string;
  label: string;
};
export type DropdownFieldProps = {
  id: string;
  data: DropdownFieldItem[];
  onClick: (text: string) => void;
  selected: string; // text value
};

export const DropdownField = (props: DropdownFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = props.data.find((d) => d.text === props.selected);
  return (
    <Wrapper
      className={`dropdown ${isOpen ? "is-active" : ""}`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="dropdown-trigger">
        <TriggerButton
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          id={props.id}
        >
          <span>{selectedItem?.label}</span>
          <HiChevronDown />
        </TriggerButton>
      </div>
      <Menu className="dropdown-menu" id="dropdown-menu" role="menu">
        <Content className="dropdown-content">
          {props.data.map((item) => (
            <ItemButton
              key={item.text}
              className={`dropdown-item ${
                item.text === selectedItem?.text && "is-active"
              }`}
              onClick={() => props.onClick(item.text)}
            >
              {item.label}
            </ItemButton>
          ))}
        </Content>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
`;

const ItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.contrast_high};
  &&.is-active {
    background-color: ${(props) => props.theme.colors.accent_2_200};
  }
`;

const TriggerButton = styled.button`
  ${AppFieldStyles}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  width: 100%;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.colors.bg_comp_1};
  width: 100%;
`;
