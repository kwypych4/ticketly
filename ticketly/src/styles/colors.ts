import { useUserStore } from 'store';

const { isThemeDark } = useUserStore.getState();

const colors = {
  white: '#ffffff',
  azure: '#007dfa',
  pressAgent: '#5f6b7a',
  whiteSolid: '#f5f6fa',
  ghostlyTuna: '#e2e6ee',
  trappedDarkness: '#101c31',
  aliceBlue: '#eff7ff',
  darkToneInk: '#121212',
  direWolf: '#282828',
  bauhaus: '#3f3f3f',
  purpleIllusionist: '#a688fa',
};

export const palette = {
  alpha: isThemeDark ? colors.darkToneInk : colors.whiteSolid,
  bravo: isThemeDark ? colors.direWolf : colors.white,
  charlie: isThemeDark ? colors.purpleIllusionist : colors.azure,
  delta: isThemeDark ? colors.white : colors.trappedDarkness,
  echo: isThemeDark ? colors.white : colors.pressAgent,
  foxtrot: isThemeDark ? colors.purpleIllusionist : colors.ghostlyTuna,
  golf: isThemeDark ? colors.bauhaus : colors.whiteSolid,
  hotel: isThemeDark ? colors.bauhaus : colors.aliceBlue,
  india: isThemeDark ? colors.pressAgent : colors.white,
  juliett: isThemeDark ? colors.bauhaus : colors.white,
};

export const getPalette = (isThemeDark: boolean) => ({
  alpha: isThemeDark ? colors.darkToneInk : colors.whiteSolid,
  bravo: isThemeDark ? colors.direWolf : colors.white,
  charlie: isThemeDark ? colors.purpleIllusionist : colors.azure,
  delta: isThemeDark ? colors.white : colors.trappedDarkness,
  echo: isThemeDark ? colors.white : colors.pressAgent,
  foxtrot: isThemeDark ? colors.purpleIllusionist : colors.ghostlyTuna,
  golf: isThemeDark ? colors.bauhaus : colors.whiteSolid,
  hotel: isThemeDark ? colors.bauhaus : colors.aliceBlue,
  india: isThemeDark ? colors.pressAgent : colors.white,
  juliett: isThemeDark ? colors.bauhaus : colors.white,
});
