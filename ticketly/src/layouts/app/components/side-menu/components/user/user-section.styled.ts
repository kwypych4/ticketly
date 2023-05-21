import styled from 'styled-components';
import { palette } from 'styles/colors';

export const Container = styled.div`
  border-top: 2px solid ${({ theme }) => theme.foxtrot};
  margin-top: auto;
  height: 75px;

  .ant-dropdown-trigger {
    display: flex;
    align-items: center;
    height: 100%;
    font-weight: 500;
    color: ${({ theme }) => theme.echo};
    cursor: pointer;

    .ant-avatar {
      margin: 0 10px 0 15px;
    }

    svg {
      margin: auto;
      color: ${({ theme }) => theme.delta};
    }
  }
`;
