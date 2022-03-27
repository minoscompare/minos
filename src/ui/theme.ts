import {
  extendTheme,
  ThemeConfig,
  Colors,
  theme as baseTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors: Colors = {
  minos: {
    50: '#ddf6ff',
    100: '#b0e0ff',
    200: '#81c9fc',
    300: '#52b3fa',
    400: '#269ef8',
    500: '#1284de',
    600: '#0567ad',
    700: '#00497d',
    800: '#002c4d',
    900: '#00101f',
  },
};

const theme = extendTheme(
  { config, colors },
  withDefaultColorScheme({ colorScheme: 'minos' })
);

export default theme;
