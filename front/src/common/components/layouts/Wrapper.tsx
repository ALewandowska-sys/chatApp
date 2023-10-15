import styled from "styled-components";

interface WrapperProps {
  rel?: boolean;
  abs?: boolean;
  width?: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(props) => props.width || "100%"};

  ${(props) => {
    if(props.rel) {
      return `
        position: relative;
      `;
    }
  }};

  ${(props) => {
    if(props.abs) {
      return `
        position: absolute;
      `;
    }
  }};
  
`;

export default Wrapper;
