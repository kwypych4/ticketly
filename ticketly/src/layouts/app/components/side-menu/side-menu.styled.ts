import styled from 'styled-components';

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  width: 280px;
  height: 100vh;
  background-color: ${({ theme }) => theme.bravo};
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
      color: ${({ theme }) => theme.echo};
      border-radius: 15px;
      padding-left: 10px;
      transition: 0.3s linear;

      &:hover {
        background-color: ${({ theme }) => theme.hotel};
        padding-left: 15px;
      }
      svg {
        width: 20px;
        margin-right: 10px;
        margin-top: -4px;
      }
      &.active {
        color: ${({ theme }) => theme.bravo};
        background-color: ${({ theme }) => theme.charlie};
      }
    }
  }
`;
