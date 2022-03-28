import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@minos/ui/theme';
import Head from 'next/head';
import { Provider as JotaiProvider } from 'jotai';
import { DefaultSeo } from 'next-seo';
import PlausibleProvider from 'next-plausible';

import defaultSeoConfig from 'next-seo.config';

// App function
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0566ac" />
        <meta name="msapplication-TileColor" content="#0566ac" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSeoConfig} />
      <PlausibleProvider
        domain="minoscompare.com"
        customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
        selfHosted
      >
        <JotaiProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </JotaiProvider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
