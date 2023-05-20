import styled from 'styled-components';
import { colors } from 'styles';

const gap = 18;

type PageItemProps = {
  isHalf?: boolean;
};
export const PageContent = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  gap: ${gap}px;
  /* flex-wrap: wrap; */
`;

export const PageItem = styled.div<PageItemProps>`
  width: ${({ isHalf }) => (isHalf ? `calc(50% - ${gap / 2}px)` : `100%`)};
  border-radius: 20px;
  background-color: ${colors.white};
  padding: 12px;
  ${PageContent} {
    flex-wrap: wrap;
    background-color: blue;
  }

  &:nth-of-type(odd) {
    margin-right: ${({ isHalf }) => (isHalf ? `${gap}px` : 'unset')};
  }
  &:nth-of-type(n + 3) {
    margin-top: ${gap}px;
  }
`;
