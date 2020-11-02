import React, { useState } from 'react';
import styled from 'styled-components';
import DrawBoard from './components/DrawBoard';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('00000101100111011000011111');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <Wrapper>
      <Main>
        <DrawBoard input={inputValue} />
        <Input type="text" value={inputValue} onChange={handleInput} />
      </Main>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 3rem;
  width: min-content;
  background-color: #dc999914;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
`;

const Input = styled.input`
  width: 17em;
  height: 1.5rem;
  border: none;
  border-radius: 0.2rem;
  margin-top: 1.5rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
`;
