import styled, { css } from "styled-components"
import { IconType, IconContext } from "@react-icons/all-files"
import theme from "styles/theme"

interface MenuButtonProps {
  Icon: IconType
  onClick: any
  active: boolean
}
export const MenuButton = ({ Icon, onClick, active }: MenuButtonProps) => {
  return (
    <IconContext.Provider value={{ color: theme.colors.contrast_high, size: "1.25em" }}>
      <Button onClick={onClick} active={active}><Icon /></Button>
    </IconContext.Provider>
  )
}

const Button = styled.button<{ active: boolean }>`
  background-color: transparent;
  border: none;
  padding: 0.5em;
  border-radius: 0.125em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  &:hover {
    ${props => `background-color: ${props.theme.colors.bg_comp_2}`}
  }
    ${props => {
    if (props.active) {
      return css`
        background-color: ${props.theme.colors.bg_comp_2};
        &:hover {
          background-color: ${props.theme.colors.bg_comp_1};
        }
      `} else return undefined
  }
  }
`