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

  margin-top: 60px;

  h1 {
    margin-top: 20px;
    align-self: flex-start;
  }
`;

export const Debtor = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);

  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
