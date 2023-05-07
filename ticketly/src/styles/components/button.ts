import { css } from 'styled-components';

import { colors } from '../colors';

export const button = css`
  button {
    display: flex;
    align-items: center;
    svg {
      margin-right: 6px;
    }

    margin-right: 30px;
    color: ${colors.trappedDarkness};
    background-color: ${colors.ghostlyTuna};

    padding: 12px;
    height: 50%;

    border: 1px solid ${colors.ghostlyTuna};
    border-radius: 15px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.15s linear;
    &:hover {
      background-color: ${colors.azure};
      color: ${colors.white};
    }
  }
`;
