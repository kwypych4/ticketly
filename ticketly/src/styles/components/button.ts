import { css } from 'styled-components';

import { palette } from '../colors';

export const button = css`
  button {
    display: flex;
    align-items: center;
    svg {
      margin-right: 6px;
    }

    color: ${palette.bravo};
    background-color: ${palette.charlie};

    padding: 12px;
    height: 50%;

    border: 1px solid ${palette.foxtrot};
    border-radius: 15px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.15s linear;
    &:hover {
      background-color: ${palette.charlie}a0;
      color: ${palette.delta};
    }
  }

  .ant-btn-primary {
    color: ${palette.bravo} !important;
    background-color: ${palette.charlie} !important;
    &:hover {
      border-color: ${palette.charlie}a0 !important;
      background-color: ${palette.charlie}a0 !important;
      color: ${palette.delta} !important;
    }
  }
  .ant-btn-default {
    color: ${palette.echo} !important;
    background-color: ${palette.bravo} !important;
    &:hover {
      border-color: ${palette.charlie} !important;
      background-color: ${palette.charlie}a0 !important;
      color: ${palette.delta} !important;
    }
  }
`;
