import { css } from 'styled-components';

export const form = css`
  textarea.ant-input {
    resize: none;
  }
  .ant-form {
    display: flex;
    flex-direction: column;
  }
  .ant-form-item-row {
    display: flex;
    flex-direction: column;

    label {
      text-align: start !important;
    }
  }

  .ant-form-item {
    margin-bottom: 6px;
  }
  .ant-form-item-label {
    text-align: start !important;
  }

  .ant-form-item-control {
    max-width: unset !important;
    min-height: unset !important;
  }
`;
