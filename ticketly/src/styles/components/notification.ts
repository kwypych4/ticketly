import { css } from 'styled-components';
import { palette } from 'styles';

export const notification = css`
  .ant-notification {
    .ant-notification-notice {
      background-color: ${palette.juliett};

      .ant-notification-notice-message {
        color: ${palette.delta};
      }
      .ant-notification-notice-close {
        color: ${palette.echo};
      }
    }
  }
`;
