import styled from 'styled-components';
import { colors } from 'styles/colors';

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 6px;
  h2 {
    margin: 0;
    color: ${colors.trappedDarkness};
    font-size: 30px;
  }

  button {
    display: flex;
    margin-left: auto;
    height: 60%;
  }
`;
