import styled from 'styled-components';

const gap = 18;

type PageItemProps = {
  isHalf?: boolean;
  width?: string;
};
export const PageContent = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  gap: ${gap}px;
`;

const getWidth = ({ isHalf, width }: PageItemProps) => {
  if (isHalf) return `calc(50% - ${gap / 2}px)`;
  if (width) return width;
  return '100%';
};

export const PageItem = styled.div<PageItemProps>`
  display: flex;
  flex-direction: column;
  width: ${({ isHalf, width }) => getWidth({ isHalf, width })};
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
