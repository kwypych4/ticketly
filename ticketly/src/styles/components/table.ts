import { css } from 'styled-components';
import { palette } from 'styles';

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
          background-color: transparent;
          th {
            background-color: transparent;
            color: ${palette.delta};
            border-color: ${palette.golf};

            &::before {
              background-color: transparent !important;
            }
          }

          thead {
            tr {
              td {
                border-color: ${palette.golf};
              }
            }
          }
          tbody {
            .ant-table-placeholder {
              background-color: transparent;
              .ant-empty-description {
                color: ${palette.delta};
              }
            }
            td {
              border-color: ${palette.golf};

              .ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
                border-color: ${palette.charlie};
                background-color: ${palette.charlie};
              }
            }
            tr:hover {
              background-color: ${palette.golf};

              td {
                background-color: ${palette.golf};
              }
            }
          }

          td {
            background-color: transparent;
            color: ${palette.delta};
            a {
              color: ${palette.charlie};

              &:hover {
                color: ${palette.delta};
              }
            }
          }
        }

        .ant-pagination {
          .ant-pagination-item {
            background-color: transparent;

            a {
              color: ${palette.charlie};
            }
          }
          li {
            button {
              color: ${palette.delta};
            }

            border-color: ${palette.charlie};
          }
        }
      }
    }
  }
`;
