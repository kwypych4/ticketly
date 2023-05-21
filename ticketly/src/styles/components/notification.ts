import { css } from 'styled-components';
 

export const notification = css`
  .ant-notification {
    .ant-notification-notice {
      background-color: ${({ theme }) => theme.juliett};

      .ant-notification-notice-message {
        color: ${({ theme }) => theme.delta};
      }
      .ant-notification-notice-close {
        color: ${({ theme }) => theme.echo};
      }
    }
  }
`;
