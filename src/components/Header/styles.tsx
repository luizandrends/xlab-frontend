import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #1c1a21;
  height: 65px;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.13);
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1024px;

  .links {
    display: flex;
    align-items: center;
    animation: ${appearFromRight} 1.5s;

    #debts {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .profile {
    display: flex;
    align-items: center;
    animation: ${appearFromLeft} 1.5s;

    small {
      font-size: 20px;

      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
