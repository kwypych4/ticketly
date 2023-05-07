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
    display: flex;
    align-items: center;
    svg {
      margin-right: 6px;
    }
    margin-left: auto;
    margin-right: 30px;
    color: ${colors.trappedDarkness};
    background-color: ${colors.ghostlyTuna};

    padding: 12px;
    height: 50%;

    border: 1px solid ${colors.ghostlyTuna};
    border-radius: 15px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.15s linear;
    &:hover {
      background-color: ${colors.azure};
      color: ${colors.white};
    }
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
