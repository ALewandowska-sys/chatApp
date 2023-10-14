import React, { useState } from "react";
import styled from "styled-components";
import Wrapper from "../layouts/Wrapper";

interface TextAreaStyledProps {
  valid: boolean;
}

const TextAreaStyled = styled.textarea<TextAreaStyledProps>`
  ${(props) => !props.valid && "border-color:  red;"};
  
`;

export interface CreatePostTextAreaProps {
  register: any;
  errorMessages: any;
}

export default function CreatePostTextArea({
  register,
  errorMessages, 
}: CreatePostTextAreaProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Wrapper rel>
      <TextAreaStyled
        rows={3}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
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
        valid={!(!!errorMessages)}
        className="add-new-post__text-area"
        placeholder="How are you feeling today?"
      />
    {errorMessages && 
      <div style={{ 
        position: "absolute", 
        top: "95px", 
        left: "5px",
        color: "red",
      }}>
        {errorMessages}
      </div>
    }
    </Wrapper>
  )
}
