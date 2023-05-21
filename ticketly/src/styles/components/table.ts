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
          background-color: transparent;
          th {
            background-color: transparent;
            color: ${({ theme }) => theme.delta};
            border-color: ${({ theme }) => theme.golf};

            &::before {
              background-color: transparent !important;
            }
          }

          thead {
            tr {
              td {
                border-color: ${({ theme }) => theme.golf};
              }
            }
          }
          tbody {
            .ant-table-placeholder {
              background-color: transparent;
              .ant-empty-description {
                color: ${({ theme }) => theme.delta};
              }
            }
            td {
              border-color: ${({ theme }) => theme.golf};

              .ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
                border-color: ${({ theme }) => theme.charlie};
                background-color: ${({ theme }) => theme.charlie};
              }
            }
            tr:hover {
              background-color: ${({ theme }) => theme.golf};

              td {
                background-color: ${({ theme }) => theme.golf};
              }
            }
          }

          td {
            background-color: transparent;
            color: ${({ theme }) => theme.delta};
            a {
              color: ${({ theme }) => theme.charlie};

              &:hover {
                color: ${({ theme }) => theme.delta};
              }
            }
          }
        }

        .ant-pagination {
          .ant-pagination-item {
            background-color: transparent;

            a {
              color: ${({ theme }) => theme.charlie};
            }
          }
          li {
            button {
              color: ${({ theme }) => theme.delta};
            }

            border-color: ${({ theme }) => theme.charlie};
          }
        }
      }
    }
  }
`;
