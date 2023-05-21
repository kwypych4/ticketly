import { css } from 'styled-components';

export const dropdown = css`
  .ant-dropdown {
    .ant-dropdown-menu {
      background-color: ${({ theme }) => theme.golf};

      .ant-dropdown-menu-item {
        color: ${({ theme }) => theme.echo} !important;

        &:hover {
          background-color: ${({ theme }) => theme.bravo} !important;
        }
      }
    }
  }
`;
