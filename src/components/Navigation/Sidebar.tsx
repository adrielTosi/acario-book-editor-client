import { GetUserQuery } from "graphql/generated/graphqlTypes";
import { useAvatar } from "lib/hooks/useAvatar";
import router, { useRouter } from "next/router";
import React from "react";
import styled, { css } from "styled-components";
import theme from "styles/theme";
import { UserMedia } from "../Profile/UserMedia";
import { Text } from "../typography/Text";
import { AppLink } from "../ui/AppLink";
import { Box } from "../ui/Box";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { RiDraftLine } from "@react-icons/all-files/ri/RiDraftLine";
import { AiOutlinePlusCircle } from "@react-icons/all-files/ai/AiOutlinePlusCircle";
import { SidebarItem } from "./SidebarItem";

export type SidebarProps = {
  data: GetUserQuery;
  isDashboard?: boolean;
  handleFollow?: () => void;
  handleUnfollow?: () => void;
  currentUserAlreadyFollows?: boolean | null;
};
export const Sidebar = ({
  data,
  isDashboard = false,
  handleFollow,
  handleUnfollow,
  currentUserAlreadyFollows,
}: SidebarProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Wrapper>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb="1em"
      >
        <UserMedia
          avatarSeed={data.getUser.avatarSeed}
          avatarType={data.getUser.avatarType}
          name={data.getUser.name}
          username={data.getUser.username}
        />
        {!isDashboard && (
          <Button
            p="6px 14px"
            round
            onClick={currentUserAlreadyFollows ? handleUnfollow : handleFollow}
            variant={currentUserAlreadyFollows ? "secondary" : "primary"}
          >
            {currentUserAlreadyFollows ? "Unfollow" : "Follow"}
          </Button>
        )}
        {isDashboard && currentPath !== "/dashboard/edit" && (
          <Button
            variant="secondary"
            lined
            round
            p="6px 14px"
            onClick={() => router.push("/dashboard/edit")}
          >
            Edit
          </Button>
        )}
      </Box>

      <Box display="flex" justifyContent="space-between">
        <div>
          <Pill text={`${data.getUser._count.chapters} tales`} />
        </div>
        <div>
          <div>
            <Text color={theme.colors.contrast_med} inline_block size="small">
              {data.getUser._count.followers} followers
            </Text>
          </div>
          <div>
            <Text color={theme.colors.contrast_med} inline_block size="small">
              {data.getUser._count.following} following
            </Text>
          </div>
        </div>
      </Box>
      <Box mt="1em" mb="1em">
        <Bio>{data.getUser.bio}</Bio>
      </Box>

      {isDashboard && (
        <>
          <SidebarItem
            text="New Tale"
            icon={<AiOutlinePlusCircle size="24px" />}
            link="/create"
          />
          <SidebarItem
            text="Read Later"
            icon={<AiOutlineSave size="24px" />}
            link="/readlater"
          />
          <SidebarItem
            text="Drafts"
            icon={<RiDraftLine size="24px" />}
            link="/drafts"
          />
        </>
      )}
    </Wrapper>
  );
};

export type WithSidebarProps = SidebarProps & {
  children: React.ReactNode;
};
export const WithSidebar = ({ children, ...rest }: WithSidebarProps) => {
  return (
    <div className="columns">
      <Box className="column is-4-tablet is-3-desktop" pb="0">
        <Sidebar {...rest} />
      </Box>
      <Bordered
        className="column is-8-tablet is-9-desktop"
        display="inline-block"
      >
        {children}
      </Bordered>
    </div>
  );
};

const Wrapper = styled.aside`
  padding-top: 1.25em;
  ${(props) => {
    return css`
      @media ${props.theme.device.tablet} {
        position: sticky;
        top: 0;
        bottom: 0;
      }
    `;
  }}
`;

const Bordered = styled(Box)`
  padding-top: 2em;
  min-height: calc(100vh - 52px);
  ${(props) => {
    return css`
      @media ${props.theme.device.tablet} {
        border-left: ${(props) =>
          `1px solid ${props.theme.colors.comp_outline}`};
      }
    `;
  }}
`;

const Bio = styled.p`
  background-color: ${(props) => props.theme.colors.bg_comp_1};
  color: ${(props) => props.theme.colors.contrast_med};
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
`;

const NavItem = styled(AppLink)`
  width: 100%;
  padding: 4px 8px;
`;
