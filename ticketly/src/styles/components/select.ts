import { css } from 'styled-components';
import { palette } from 'styles';

export const select = css`
  .ant-select {
    &:hover,
    &-open,
    &-focused {
      .ant-select-selector {
        border-color: ${palette.charlie} !important;
      }
    }
    .ant-select-selection-item {
      color: ${palette.delta} !important;
    }
    border: none !important;

    .ant-select-selector {
      background-color: ${palette.golf} !important;
    }
  }

  .ant-select-dropdown {
    background-color: ${palette.golf};
  }

  .ant-select-item-option {
    color: ${palette.echo} !important;

    &:hover {
      background-color: ${palette.bravo} !important;
    }
    &-selected {
      background-color: ${palette.india} !important;
    }
  }
`;
