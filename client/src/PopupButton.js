import React from "react";
import styled from "styled-components";

const StlyedPopupButton = styled.button`
  position: fixed;
  bottom: 90px;
  left: calc(50% - 300px);
  transform: translateX(50%);
  width: 150px;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }

  color: white;
  font-family: "Inconsolata", monospace;
  font-weight: bold;

  z-index: 1;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background: rgba(30, 30, 30, 1);
  overflow: hidden;

  &::after {
    content: "";
    z-index: -1;
    background-color: hsla(0, 0%, 100%, 0.2);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 1.25em;
    transform: translateX(-800%) rotate(35deg);
  }

  &:hover {
    cursor: pointer;
  }

  &:hover::after {
    transition: transform 0.45s ease-in-out;
    transform: translateX(300%) rotate(35deg);
  }
`;

const ButtonLabel = styled.label`
  color: white;
  font-family: "Inconsolata", monospace;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const PopupButton = () => {
  return (
    <StlyedPopupButton>
      <ButtonLabel>Contribute</ButtonLabel>
    </StlyedPopupButton>
  );
};
