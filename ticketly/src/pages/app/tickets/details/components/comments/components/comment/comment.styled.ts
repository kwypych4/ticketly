import styled from 'styled-components';
import { colors } from 'styles';

export const CommentWrapper = styled.div`
  width: 90%;
  margin: 12px 24px;
  margin-right: 36px;
  align-self: center;
  min-height: 60px;
  border-bottom: 1px solid ${colors.ghostlyTuna};
  margin-bottom: 18px;
`;

export const CommentTitle = styled.div`
  display: flex;
  color: ${colors.pressAgent};

  span {
    font-size: 12px;
  }
`;

export const CommentContent = styled.div`
  font-size: 16px;
  margin: 6px 12px 18px 12px;
  width: 100%;
`;

export const CommentAttachments = styled.div`
  display: flex;
  margin: 0 12px 12px 12px;
  & > * {
    margin-right: 18px;
  }
`;

export const CommentButtons = styled.div`
  margin-left: auto;

  svg {
    margin-left: 18px;
    cursor: pointer;
    &:hover {
      color: ${colors.azure};
    }
  }
`;
