import styled from 'styled-components';

export const AuthWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.alpha};
`;
