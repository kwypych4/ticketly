import { css } from 'styled-components';

export const switchButton = css`
  .ant-switch {
    .ant-switch-inner {
      background-color: ${({ theme }) => theme.charlie} !important;
    }
  }
`;
