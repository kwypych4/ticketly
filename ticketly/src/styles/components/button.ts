import { css } from 'styled-components';

export const button = css`
  button {
    display: flex;
    align-items: center;
    svg {
      margin-right: 6px;
    }

    color: ${({ theme }) => theme.bravo};
    background-color: ${({ theme }) => theme.charlie};
    background-color: ${({ theme }) => theme.charlie};
    padding: 12px;
    height: 50%;

    border: 1px solid ${({ theme }) => theme.foxtrot};
    border-radius: 15px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.15s linear;
    &:hover {
      background-color: ${({ theme }) => theme.charlie}a0;
      color: ${({ theme }) => theme.delta};
    }
  }

  .ant-btn-primary {
    color: ${({ theme }) => theme.bravo} !important;
    background-color: ${({ theme }) => theme.charlie} !important;
    &:hover {
      border-color: ${({ theme }) => theme.charlie}a0 !important;
      background-color: ${({ theme }) => theme.charlie}a0 !important;
      color: ${({ theme }) => theme.delta} !important;
    }
  }
  .ant-btn-default {
    color: ${({ theme }) => theme.echo} !important;
    background-color: ${({ theme }) => theme.bravo} !important;
    &:hover {
      border-color: ${({ theme }) => theme.charlie} !important;
      background-color: ${({ theme }) => theme.charlie}a0 !important;
      color: ${({ theme }) => theme.delta} !important;
    }
  }
`;
