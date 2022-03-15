import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@minos/ui/theme';
import Head from 'next/head';
import { Provider as JotaiProvider } from 'jotai';
import { DefaultSeo } from 'next-seo';

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
          <DefaultSeo
            openGraph={{
              type: 'websiite',
              locale: 'en_IE',
              url: 'https://www.minoscompare.com/',
              site_name: 'Minoscompare',
            }}
            defaultTitle="Minoscompare"
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </JotaiProvider>
    </>
  );
}

export default MyApp;
