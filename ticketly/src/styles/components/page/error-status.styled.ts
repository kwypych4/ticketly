import styled from 'styled-components';
import { palette } from 'styles';

export const ErrorStatus = styled.div`
  position: relative;
  height: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  color: ${palette.echo};
  background-color: ${palette.bravo};
  font-size: 256px;
  p {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 220px;
    font-weight: bold;
    margin-block-start: 0;
    margin-block-end: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
