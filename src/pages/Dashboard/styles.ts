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
  margin-top: 40px;

  h1 {
    @media (max-width: 350px) {
      font-size: 20px;
      align-self: center;
    }
  }

  form {
    margin-top: 20px;

    hr {
      margin-bottom: 20px;
      margin-top: 20px;
    }

    .custom-date-picker-wrapper {
      input {
        width: 100%;
      }
    }

    .buttons {
      display: flex;
      justify-content: flex-end;

      @media (max-width: 500px) {
        flex-direction: column;
        justify-content: center;
      }

      button {
        width: 190px;
        height: 50px;
        margin-left: 20px;

        @media (max-width: 500px) {
          width: 100%;
          margin-left: 0;
        }

        a {
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }
`;
