import { Box } from "components/ui/Box";
import styled from "styled-components";
import { AppLink } from "../ui/AppLink";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";

export type SidebarItem = {
  icon: React.ReactNode;
  text: string;
  link: string;
  isSelected?: boolean;
};
export const SidebarItem = ({ text, icon, link, isSelected }: SidebarItem) => {
  return (
    <Wrapper>
      <AppLink href={link}>
        <NavItem
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            {icon} &nbsp; {text}
          </Box>
          <FaChevronRight />
        </NavItem>
      </AppLink>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NavItem = styled(Box)<{ isSelected?: boolean }>`
  width: 100%;
  padding: 12px 4px;
  color: ${(props) => props.theme.colors.contrast_med};
  &:hover {
    color: ${(props) => props.theme.colors.contrast_high};
    background-color: ${(props) => props.theme.colors.accent_2_bg_light};
  }
`;
