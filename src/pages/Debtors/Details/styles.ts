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

  strong {
    font-size: 45px;
  }

  span {
    font-size: 32px;

    margin-top: 22px;
  }

  small {
    font-size: 30px;
    margin-top: 10px;
  }
`;

export const Debts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  margin-top: 20px;
  max-width: 1024px;
  width: 100%;

  background: #1c1a21;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.13);
  padding: 30px;
  border-radius: 4px;

  margin-bottom: 20px;

  .without-debt {
    small {
      font-size: 16px;
      color: #666;
    }
  }

  .item {
    display: flex;

    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);

    .debt {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 18px;
      }

      span {
        font-size: 16px;
        margin-top: 10px;
        color: #666;
      }

      small {
        font-size: 14px;
        margin-top: 5px;
        color: #666;
      }
    }
  }
`;
