import { css } from 'styled-components';
import { palette } from 'styles';

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
      color: ${palette.delta} !important;
    }
  }

  .ant-form-item-control-input-content {
    gap: 18px;
    display: flex;

    .ant-input,
    .ant-input-number,
    .ant-input-password {
      background-color: ${palette.juliett};
      color: ${palette.delta};
      &:hover,
      &:focus,
      &-focused {
        border-color: ${palette.charlie};
      }
      .ant-input-suffix {
        .ant-input-password-icon {
          color: ${palette.delta} !important;
          &:hover {
            color: ${palette.charlie} !important;
          }
        }
      }
      .ant-input-number-handler-wrap {
        background-color: ${palette.juliett};
        .ant-input-number-handler {
          color: ${palette.delta} !important;
          & > * {
            &:hover {
              color: ${palette.charlie};
            }
            color: ${palette.delta} !important;
          }
        }
      }
    }
    .ant-form-item:first-of-type {
      flex-grow: 1;
    }
    .ant-form-item {
      margin-bottom: 6px;
    }
    .ant-form-item:nth-of-type(2) {
      button {
        margin-top: 32px;
        height: 32px;
      }
    }
  }

  .ant-form-item-label {
    text-align: start !important;
  }

  .ant-form-item-control {
    max-width: unset !important;
    min-height: unset !important;
  }
`;
