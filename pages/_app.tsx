import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@minos/ui/theme';
import Head from 'next/head';
import { Provider as JotaiProvider, atom, useAtom } from 'jotai';
import { Minos } from '@minos/lib/types';

// Creates atoms (state management)
export const comparedCPUs = atom(Array<Minos.Cpu>());

// App function
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <JotaiProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </JotaiProvider>
    </>
  );
}

export default MyApp;
