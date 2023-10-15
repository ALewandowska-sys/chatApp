import styled from "styled-components";

interface AbsLabelProps {
  top: string;
  left: string;
}

const AbsLabel = styled.div<AbsLabelProps>`
  position: absolute;
  color: red;;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

export default AbsLabel;
