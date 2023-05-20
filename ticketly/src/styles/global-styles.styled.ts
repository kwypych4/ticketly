import { createGlobalStyle } from 'styled-components';

import { button, form, modal, notification, select, table } from './components';

export const GlobalStyle = createGlobalStyle` 

body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
    box-sizing: border-box;
    width: 100%;
  }

textarea {
  resize: none;
}
  ${button}
  ${form}
  ${table}
  ${select}
  ${modal}
  ${notification}
`;
