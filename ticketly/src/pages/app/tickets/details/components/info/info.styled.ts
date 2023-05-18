import styled from 'styled-components';
import { colors } from 'styles';

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
    border-bottom: 1px solid ${colors.ghostlyTuna};
    padding-left: 6px;

    .ant-select {
      padding: 0;
    }

    .ant-image {
      margin-right: 20px;
    }

    .ant-image-mask {
      width: 100%;
      height: 100%;
    }
    span {
      color: ${colors.pressAgent};
      margin: 0;
      padding-left: 0;
      font-size: 12px;
      display: block;
    }
    h3,
    p {
      margin: 0;
      padding: 0;
      margin-bottom: 12px;
      color: ${colors.trappedDarkness};
    }
  }
`;
