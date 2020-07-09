import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  align-self: center;
  max-width: 1024px;
  width: 100%;
  padding: 30px;
  margin-top: 40px;

  form {
    margin-top: 20px;

    .buttons {
      display: flex;
      justify-content: flex-end;

      button {
        width: 190px;
        height: 50px;
        margin-left: 20px;
      }
    }
  }
`;
