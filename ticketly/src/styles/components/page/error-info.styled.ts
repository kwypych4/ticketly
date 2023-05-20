import styled from 'styled-components';
import { palette } from 'styles';

export const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${palette.echo};
  height: 50%;
  width: 100%;
  color: ${palette.foxtrot};
  h1 {
    font-size: 64px;
  }
  h2 {
    margin-top: -42px;
    font-weight: normal;
  }
  button {
    margin-top: 48px;
    height: 50px;
    padding: 0 36px;
    border-radius: 40px;
    letter-spacing: 1px;
  }
`;
