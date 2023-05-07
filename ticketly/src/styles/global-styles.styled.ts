import { createGlobalStyle } from 'styled-components';

import { button } from './components';

export const GlobalStyle = createGlobalStyle` 


body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
    box-sizing: border-box;
    width: 100%;
  }

  ${button}
`;
