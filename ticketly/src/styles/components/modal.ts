import { css } from 'styled-components';
 

export const modal = css`
  .ant-modal {
    .ant-modal-content {
      background-color: ${({ theme }) => theme.bravo};
      .ant-modal-close {
        color: ${({ theme }) => theme.echo};
      }
      .ant-modal-header {
        background-color: ${({ theme }) => theme.bravo};

        .ant-modal-title {
          color: ${({ theme }) => theme.delta};
        }
      }
    }
  }
`;
