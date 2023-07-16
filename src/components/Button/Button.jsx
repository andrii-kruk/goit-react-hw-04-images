import React from 'react';
import { StyledButton } from './Button.styled';

export const Button = ({ children, loadMore }) => {
  return (
    <StyledButton type="button" onClick={loadMore}>
      {children}
    </StyledButton>
  );
};

