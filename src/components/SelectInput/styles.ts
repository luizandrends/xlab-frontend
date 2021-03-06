import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;

  width: 100%;
  border: 2px solid #232129;
  color: #666360;
  display: flex;
  align-items: center;

  .css-2b097c-container {
    width: 100%;

    .react-select__control {
      background: #232129;
      border: 2px solid #232129;
      padding: 8px;

      .react-select__single-value {
        color: #fff;
      }
    }

    .react-select__menu {
      width: 100%;
      max-height: 300px;

      .react-select__menu-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #232129;

        padding: 15px;

        .react-select__option {
          display: flex;
          flex-direction: column;
          height: 50px;
          background: none;
          padding-bottom: 5px;
          margin-bottom: 5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.6);

          padding: 15px;
        }
      }
    }
  }

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #fff;
      border-color: #fff;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #fff;
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
