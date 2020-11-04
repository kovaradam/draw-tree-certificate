import React, { useState } from 'react';
import styled from 'styled-components';
import { Main } from '../../style/Main';
import Board from './Board';
import { FiX } from 'react-icons/fi';

type Props = { id: number; onClose: () => void };

const DrawBoard: React.FC<Props> = ({ id, onClose }) => {
  const [inputValue, setInputValue] = useState('000101100110011100011011');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <Wrapper>
      <CloseButton onClick={onClose}>
        <FiX />
      </CloseButton>
      <Board id={id} input={inputValue} />
      <Input type="text" value={inputValue} onChange={handleInput} />
    </Wrapper>
  );
};

export default DrawBoard;

const Wrapper = styled(Main)`
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  width: 17em;
  height: 1.5rem;
  border-width: 1px;
  border-color: #8080804a;
  border-radius: 0.2rem;
  margin-top: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  padding: 0.5rem;
  margin: 0.5rem;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: white;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #eeeded;
  }
`;
