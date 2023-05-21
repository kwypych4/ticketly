import styled from 'styled-components';

const gap = 18;

type PageItemProps = {
  isHalf?: boolean;
};
export const PageContent = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  gap: ${gap}px;
`;

export const PageItem = styled.div<PageItemProps>`
  display: flex;
  flex-direction: column;
  width: ${({ isHalf }) => (isHalf ? `calc(50% - ${gap / 2}px)` : `100%`)};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bravo};
  padding: 12px;
  h2,
  h3 {
    color: ${({ theme }) => theme.delta};
  }

  &:nth-of-type(odd) {
    margin-right: ${({ isHalf }) => (isHalf ? `${gap}px` : 'unset')};
  }
  &:nth-of-type(n + 3) {
    margin-top: ${gap}px;
  }
`;
