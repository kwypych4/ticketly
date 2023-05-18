import { css } from 'styled-components';

export const table = css`
  .ant-table-wrapper {
    height: 100%;

    .ant-spin-nested-loading {
      height: 100%;

      .ant-spin-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        .ant-table {
          flex-grow: 1;
        }
      }
    }
  }
`;
