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

export const Debt = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);

  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);

  form {
    .react-datepicker__input-container {
      input {
        width: 100%;
      }
    }
  }
`;

export const DebtDetails = styled.div`
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

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);

    @media (max-width: 360px) {
      flex-direction: column;
    }

    .debt {
      display: flex;
      flex-direction: column;

      @media (max-width: 360px) {
        text-align: left;
        width: 100%;
      }

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

    .redirect {
      display: flex;
      align-items: center;

      @media (max-width: 360px) {
        text-align: left;
        width: 100%;
      }

      strong {
        margin-right: 10px;
        padding-right: 10px;
        border-right: 1px solid rgba(255, 255, 255, 0.6);

        font-size: 18px;
        color: #666;
      }
    }
  }
`;
