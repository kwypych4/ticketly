import { css } from 'styled-components';
import { palette } from 'styles';

export const modal = css`
  .ant-modal {
    .ant-modal-content {
      background-color: ${palette.bravo};
      .ant-modal-close {
        color: ${palette.echo};
      }
      .ant-modal-header {
        background-color: ${palette.bravo};

        .ant-modal-title {
          color: ${palette.delta};
        }
      }
    }
  }
`;
