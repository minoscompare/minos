import { extendTheme, ThemeConfig, Colors } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors: Colors = {
  brand: {
    50: '#EAF3FA',
    100: '#C5DCF1',
    200: '#A0C6E8',
    300: '#7BAFE0',
    400: '#5698D7',
    500: '#3182CE',
    600: '#2768A5',
    700: '#1D4E7C',
    800: '#143452',
    900: '#0A1A29',
  },
};

const theme = extendTheme({ config, colors });

export default theme;
