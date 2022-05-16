import { withApollo } from "apollo/withApollo";
import { useCurrentUser } from "graphql/generated/page";
import Link from "next/link";
import styled from "styled-components";
import theme from "styles/theme";
import logo from "../../images/Logo.png";
import { H6Link } from "../typography/Heading";
import { Text } from "../typography/Text";
import { AppLink } from "../ui/AppLink";
import { Avatar } from "../ui/Avatar";
import { Box } from "../ui/Box";

const NavbarComp = () => {
  const { data, loading, error } = useCurrentUser();
  return (
    <Wrapper>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Link href={data ? "/dashboard" : "/"}>
                <a>
                  <img src={logo.src} width="112" />
                </a>
              </Link>
            </div>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {data && !loading && !error ? (
                <AppLink href="/dashboard">
                  <Box display="flex" alignItems="center">
                    <Box mr="1em" color={theme.colors.contrast_high}>
                      <Text size="small">Hello {data.currentUser.name}</Text>
                    </Box>
                    <Avatar
                      seed={data.currentUser.avatarSeed}
                      type={data.currentUser.avatarType}
                      size="is-32x32"
                    />
                  </Box>
                </AppLink>
              ) : (
                <H6Link href="/login">Login</H6Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export const Navbar = withApollo(NavbarComp);

const Wrapper = styled.div`
  & .navbar {
    background-color: ${(props) => props.theme.colors.bg_comp_1_light};
  }
  border-bottom: ${(props) => `1px solid ${props.theme.colors.comp_outline}`};
`;
