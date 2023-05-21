import { useUserStore } from 'store';
import { ThemeProvider } from 'styled-components';
import { getPalette } from 'styles';

type CustomThemeProviderProps = {
  children: JSX.Element;
};
export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const isThemeDark = useUserStore((state) => state.isThemeDark);

  return <ThemeProvider theme={() => getPalette(isThemeDark)}>{children}</ThemeProvider>;
};
