import styled from "styled-components";
import { BsArrowsExpand } from "@react-icons/all-files/bs/BsArrowsExpand";

export const ExpandButton = () => {
  return (
    <Wrapper>
      <Button>
        <BsArrowsExpand />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Button = styled.button``;
