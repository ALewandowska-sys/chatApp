import React from "react";
import styled from "styled-components";
import Wrapper from "../layouts/Wrapper";
import AbsLabel from "../Atoms/AbsLabel";

interface TextAreaStyledProps {
  isInvalid: boolean;
}

const TextAreaStyled = styled.textarea<TextAreaStyledProps>`
  border-color: #d3d3d3;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: black;
  }
  ${(props) => {
    if(props.isInvalid) {
      return `
        border-color: red;
        color: red;
        &::placeholder {
          color: red;
        }
        &:focus {
          border-color: red;
        }
      `;
    }
  }};
`;

export interface CreatePostTextAreaProps {
  register: any;
  errorMessages: string | undefined;
}

export default function CreatePostTextArea({
  register,
  errorMessages, 
}: CreatePostTextAreaProps) {

  return (
    <Wrapper rel={true}>
      <TextAreaStyled
        isInvalid={errorMessages}
        rows={3}
        {...register("content", {
          required: "Content cannot be empty", 
          maxLength: { 
            value: 200, 
            message: "Content cannot exceed 200 characters"
          }, 
          minLength: {
            value: 5, 
            message: "Content needs at least 5 characters."
          } 
        })}
        className="add-new-post__text-area"
        placeholder="How are you feeling today?"
      />
    {errorMessages && 
      <AbsLabel top="95px" left="5px">
        {errorMessages}
      </AbsLabel>
    }
    </Wrapper>
  )
}
