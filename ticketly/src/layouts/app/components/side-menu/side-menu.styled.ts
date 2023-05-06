import styled from 'styled-components';
import { colors } from 'styles/colors';

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  width: 280px;
  height: 100vh;
  background-color: ${colors.white};
`;
export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 10px;
    height: 45px;

    a {
      display: flex;
      align-items: center;
      height: 100%;
      text-decoration: none;
      color: ${colors.pressAgent};
      border-radius: 15px;
      padding-left: 10px;
      transition: 0.3s linear;

      &:hover {
        background-color: ${colors.azure}10;
        padding-left: 15px;
      }
      svg {
        width: 20px;
        margin-right: 10px;
        margin-top: -4px;
      }
      &.active {
        color: ${colors.white};
        background-color: ${colors.azure};
      }
    }
  }
`;
