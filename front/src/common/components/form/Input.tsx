import React from 'react';
import styled from 'styled-components';

interface InputStyledProps {
  isInvalid: boolean;
  touched: boolean;
}

const InputStyled = styled.button<InputStyledProps>`
  outline: none;
  border: 1px solid #bdb6b6;
  background-color: #f7f7f7;
  border-radius: 4px;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #ededed;
  }
  ${(props) => {
    if(props.touched && props.isInvalid) {
      return `
        border-color: red;
        color: red;
      `;
    }
  }};
`;

export interface InputProps {
  isInvalid: boolean;
  touched: boolean;
  value: string;
  onClick: (event: MouseEvent) => void;
}

export default function Input({
  isInvalid,
  touched,
  value,
  onClick,
}: InputProps) {
  return (
    <InputStyled 
      onClick={(e: any) => onClick(e)}
      isInvalid={isInvalid}
      touched={touched}
    >
      {value}
    </InputStyled>
  )
}
