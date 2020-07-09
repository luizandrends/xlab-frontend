import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;

  margin-top: 60px;

  max-width: 1024px;
  width: 100%;

  h1 {
    align-self: flex-start;
  }

  .find-debt {
    display: flex;
    width: 100%;

    margin-top: 10px;

    input {
      width: 90%;
      padding: 10px 10px;
      border: 2px solid #232129;
      background: #232129;
      border-radius: 4px;

      &::placeholder {
        color: #666360;
      }
    }

    button {
      width: 10%;
      border: 0;
      background: #232129;
      border-radius: 4px;
      margin-left: 10px;
      color: #666360;
      font-weight: bold;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;

  margin-top: 20px;
  max-width: 1024px;
  width: 100%;

  background: #1c1a21;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.13);
  padding: 30px;
  border-radius: 4px;

  margin-bottom: 20px;

  .list-container {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);

      .debtor {
        display: flex;
        flex-direction: column;
        text-align: center;

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

      .debt {
        display: flex;
        flex-direction: column;
        text-align: left;

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

      .options {
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
          margin-right: 15px;
        }

        button {
          padding: 4px 15px;
          border: 0;
          border-radius: 4px;
          background: #fff;
          color: #666;
          font-weight: bold;
        }
      }
    }
  }
`;
