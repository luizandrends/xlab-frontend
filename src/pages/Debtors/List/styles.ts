import styled from 'styled-components';
import { shade } from 'polished';

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

  .find-debtor {
    display: flex;
    width: 100%;

    margin-top: 10px;

    input {
      width: 80%;
      padding: 10px 10px;
      border: 2px solid #232129;
      background: #232129;
      color: #fff;
      border-radius: 4px;
      box-shadow: 0 7px 12px rgba(0, 0, 0, 0.13);

      &::placeholder {
        color: #666360;
      }
    }

    button {
      margin-left: 10px;
      width: 200px;

      border: 0px;
      background: #1c1a21;
      border-radius: 4px;
      color: #fff;
      transition: background 0.4s;
      box-shadow: 0 7px 12px rgba(0, 0, 0, 0.13);

      &:hover {
        background: ${shade(0.2, '#1c1a21')};
      }
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

    .without-debtor {
      display: flex;
      flex-direction: column;

      span {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      }
    }

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
          border: 0;
          background: transparent;
        }
      }
    }
  }
`;
