import styled from "styled-components";

interface WrapperProps {
  rel?: boolean;
  abs?: boolean;
  width?: string;
}

const Wrapper = styled.div<WrapperProps>`
  ${(props) => props.rel && "position: relative;"};
  ${(props) => props.abs && "position: absolute;"};
  width: ${(props) => props.width || "100%"};
`;

export default Wrapper;
