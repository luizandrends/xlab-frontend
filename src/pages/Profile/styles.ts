import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  max-width: 1024px;
  width: 100%;

  h1 {
    margin-top: 30px;
    align-self: flex-start;
  }

  form {
    width: 100%;
    margin-top: 22px;
  }
`;
