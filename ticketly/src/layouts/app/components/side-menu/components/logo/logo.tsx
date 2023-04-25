import LogoImage from 'assets/logo3.png';

import { LogoWrapper } from '.';

export const Logo = () => {
  return (
    <LogoWrapper>
      <img src={LogoImage} alt='Ticketly logo' />
    </LogoWrapper>
  );
};
