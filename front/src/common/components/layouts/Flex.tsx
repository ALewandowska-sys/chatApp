import styled from "styled-components";

interface FlexProps {
  width?: string;
  height?: string;
  center?: boolean;
  right?: boolean;
  left?: boolean;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};

  ${(props) => {
    if(props.center) {
      return `
        align-item: center;
        justify-content: center;
      `;
    }
    if(props.right) {
      return `
        align-item: center;
        justify-content: flex-end;
      `;
    }
    if(props.left) {
      return `
        align-item: center;
        justify-content: flex-start;
      `;
    }
  }}; 
`;

export default Flex;
