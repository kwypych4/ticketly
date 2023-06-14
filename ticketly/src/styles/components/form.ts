import { css } from 'styled-components';

export const form = css`
  textarea.ant-input {
    resize: none;
  }
  .ant-form {
    display: flex;
    flex-direction: column;

    .ant-switch {
      width: unset;
      display: inline-block;
    }
    button {
      display: flex;
      justify-content: center;
      width: 120px;
      align-self: flex-end;
    }
  }
  .ant-form-item-row {
    display: flex;
    flex-direction: column;

    label {
      font-weight: 700;
      text-align: start !important;
      color: ${({ theme }) => theme.delta} !important;
    }
  }

  .ant-form-item-control-input-content {
    gap: 18px;
    display: flex;

    span {
      color: ${({ theme }) => theme.delta};
    }

    .ant-upload-wrapper {
      .ant-upload {
        span.ant-upload {
          button {
            width: auto;
          }
        }
      }
    }
    .ant-input,
    .ant-input-number,
    .ant-input-password {
      background-color: ${({ theme }) => theme.juliett};
      color: ${({ theme }) => theme.delta};
      &:hover,
      &:focus,
      &-focused {
        border-color: ${({ theme }) => theme.charlie};
      }
      .ant-input-suffix {
        .ant-input-password-icon {
          color: ${({ theme }) => theme.delta} !important;
          &:hover {
            color: ${({ theme }) => theme.charlie} !important;
          }
        }
      }
      .ant-input-number-input-wrap {
        input {
          color: ${({ theme }) => theme.delta} !important;
        }
      }
      .ant-input-number-handler-wrap {
        background-color: ${({ theme }) => theme.juliett};
        .ant-input-number-handler {
          color: ${({ theme }) => theme.delta} !important;
          & > * {
            &:hover {
              color: ${({ theme }) => theme.charlie};
            }
            color: ${({ theme }) => theme.delta} !important;
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
