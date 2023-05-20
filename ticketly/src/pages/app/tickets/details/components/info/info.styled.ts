import styled from 'styled-components';
import { palette } from 'styles';

export const InfoWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  min-width: 230px;
  height: 100%;
  overflow-y: auto;

  div {
    margin-bottom: 12px;
    border-bottom: 1px solid ${palette.golf};
    padding-left: 12px;

    .ant-select {
      padding: 6px 0 0 6px;
      color: red;
    }

    .ant-image {
      margin-right: 20px;
    }

    .ant-image-mask {
      width: 100%;
      height: 100%;
    }
    span {
      color: ${palette.echo};
      margin: 0;
      padding-left: 0;
      font-size: 12px;
      display: block;
    }
    h3,
    p {
      margin: 0;
      padding-top: 6px;
      padding-left: 6px;
      margin-bottom: 12px;
      color: ${palette.delta};
    }
  }
`;
