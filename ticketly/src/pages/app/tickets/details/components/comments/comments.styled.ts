import styled from 'styled-components';
import { colors } from 'styles';

export const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 500px;
  height: 100%;
  border-right: 1px solid ${colors.ghostlyTuna};
  position: relative;
  overflow: hidden;
`;

export const CommentsTitle = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: auto;
    margin-right: 30px;
  }
`;

export const CommentsContent = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
`;
