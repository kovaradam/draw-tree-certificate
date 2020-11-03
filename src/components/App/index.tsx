import React, { useState } from 'react';
import styled from 'styled-components';
import { Main } from '../../style/Main';
import DrawBoard from '../DrawBoard';
import { FiPlus } from 'react-icons/fi';

const App: React.FC = () => {
  const [boardIds, setBoardIds] = useState([0]);

  const addDrawBoard = () => {
    const newBoardIds = boardIds.concat(boardIds.length);
    setBoardIds(newBoardIds);
  };

  const removeDrawBoard = (id: number) => {
    const newBoardIds = boardIds.filter((boardId) => boardId !== id);
    setBoardIds(newBoardIds);
  };

  return (
    <Wrapper>
      {boardIds.map((id) => (
        <DrawBoard key={id} onClose={() => removeDrawBoard(id)} />
      ))}
      <Placeholder onClick={addDrawBoard}>
        <AddIcon />
      </Placeholder>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 90vw;
  height: 100vh;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

const Placeholder = styled(Main)`
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  background-color: #80808014;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const AddIcon = styled(FiPlus)`
  font-size: 6rem;
  color: grey;
`;
