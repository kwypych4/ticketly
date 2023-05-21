import { css } from 'styled-components';

export const select = css`
  .ant-select {
    &:hover,
    &-open,
    &-focused {
      .ant-select-selector {
        border-color: ${({ theme }) => theme.charlie} !important;
      }
    }
    .ant-select-selection-item {
      color: ${({ theme }) => theme.delta} !important;
    }
    border: none !important;

    .ant-select-selector {
      background-color: ${({ theme }) => theme.golf} !important;
    }
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.golf};
  }

  .ant-select-item-option {
    color: ${({ theme }) => theme.echo} !important;

    &:hover {
      background-color: ${({ theme }) => theme.bravo} !important;
    }
    &-selected {
      background-color: ${({ theme }) => theme.india} !important;
    }
  }
`;
