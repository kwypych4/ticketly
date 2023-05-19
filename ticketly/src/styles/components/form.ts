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

  .ant-form-item-control-input-content {
    gap: 18px;
    .ant-form-item:first-of-type {
      flex-grow: 1;
    }
    .ant-form-item {
      margin-bottom: 6px;
    }
  }

  .ant-form-item-label {
    text-align: start !important;
  }

  .ant-form-item-control {
    max-width: unset !important;
    min-height: unset !important;
  }

  .ant-form-item-control-input-content {
    display: flex;

    button {
      margin-top: 32px;
      height: 32px;
    }
  }
`;
