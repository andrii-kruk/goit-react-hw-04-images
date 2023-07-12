import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import {
  StyledButton,
  StyledForm,
  StyledHeader,
  StyledInput,
} from './Searchbar.styled';

export const Searchbar = ({ handleSubmit }) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    handleSubmit(value);
    setValue('');
  };

  return (
    <StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledButton type="submit">
          {/* <StyledLabel> */}
          <BsSearch />
          {/* </StyledLabel> */}
        </StyledButton>

        <StyledInput
          onChange={onChange}
          type="text"
          placeholder="Search images and photos"
          value={value}
        />
      </StyledForm>
    </StyledHeader>
  );
};
