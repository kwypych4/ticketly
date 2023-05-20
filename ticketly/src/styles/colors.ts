const dark = true;

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
  alpha: dark ? colors.darkToneInk : colors.whiteSolid,
  bravo: dark ? colors.direWolf : colors.white,
  charlie: dark ? colors.purpleIllusionist : colors.azure,
  delta: dark ? colors.white : colors.trappedDarkness,
  echo: dark ? colors.white : colors.pressAgent,
  foxtrot: dark ? colors.purpleIllusionist : colors.ghostlyTuna,
  golf: dark ? colors.bauhaus : colors.whiteSolid,
  hotel: dark ? colors.bauhaus : colors.aliceBlue,
  india: dark ? colors.pressAgent : colors.white,
  juliett: dark ? colors.bauhaus : colors.white,
};
