import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/notifications/styles.css';
import "../theme/theme";
import type { AppProps } from 'next/app';
import theme from '../theme/theme';
import { Analytics } from "@vercel/analytics/next"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap" rel="stylesheet" />
      </Head>
      <MantineProvider
        theme={theme}
        defaultColorScheme="light"
        withCssVariables
      >
        <Component {...pageProps} />
        <Analytics/>
      </MantineProvider>
    </>
  );
}
