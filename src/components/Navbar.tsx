import styled from "styled-components"
import logo from "../images/Logo.png"

export const Navbar = () => {
  return (
    <Wrapper>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">

          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={logo.src} width="112" />
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & .navbar {
    background-color: ${props => props.theme.colors.bg_comp_1_light};

  }
  border-bottom: ${props => `1px solid ${props.theme.colors.comp_outline}`}
`