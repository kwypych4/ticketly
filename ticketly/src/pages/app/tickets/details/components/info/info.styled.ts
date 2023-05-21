import styled from 'styled-components';

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
    border-bottom: 1px solid ${({ theme }) => theme.golf};
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
      color: ${({ theme }) => theme.echo};
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
      color: ${({ theme }) => theme.delta};
    }
  }
`;
