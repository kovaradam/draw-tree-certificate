import styled from 'styled-components';

export const Main = styled.main`
  margin: 2rem;
  display: flex;
  width: 37rem;
  height: 30rem;
  overflow: hidden;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: 48rem) {
    transform: scale(0.7);
  }
`;
