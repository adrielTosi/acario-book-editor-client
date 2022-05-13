import Link, { LinkProps } from "next/link";
import styled from "styled-components";

export type AppLinkProps = LinkProps & {
  children: React.ReactNode;
};
export const AppLink = ({ children, as, passHref, ...props }: AppLinkProps) => {
  return (
    <Link {...props} passHref>
      <A>{children}</A>
    </Link>
  );
};

const A = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
